import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCycleById } from '../services/api'
import { MOCK_CYCLES } from '../utils/constants'
import enrichCycle from '../utils/cycleDataEnricher'

const AccordionSection = ({ title, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      borderBottom: '1px solid #0D0D0D',
      overflow: 'hidden',
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          cursor: 'pointer',
          background: open ? '#0C0C0C' : 'transparent',
          borderLeft: open
            ? '2px solid #FFD700'
            : '2px solid transparent',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e =>
          e.currentTarget.style.background = '#0C0C0C'}
        onMouseLeave={e =>
          e.currentTarget.style.background =
            open ? '#0C0C0C' : 'transparent'}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ fontSize: '14px' }}>{icon}</span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '10px',
            color: open ? '#FFD700' : '#555',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            {title}
          </span>
        </div>
        <span style={{
          color: '#333',
          fontSize: '12px',
          transform: open
            ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>▼</span>
      </div>
      {open && (
        <div style={{
          padding: '0 24px 20px 24px',
          background: '#080808',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

const SpecRow = ({ label, value, highlight }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #0D0D0D',
  }}>
    <span style={{
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '12px',
      color: '#555',
      letterSpacing: '1px',
    }}>
      {label}
    </span>
    <span style={{
      fontFamily: 'DM Mono, monospace',
      fontSize: '12px',
      color: highlight ? '#FFD700' : '#AAAAAA',
      textAlign: 'right',
      maxWidth: '60%',
    }}>
      {value || 'N/A'}
    </span>
  </div>
)

const Tag = ({ label, color }) => (
  <span style={{
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '9px',
    color: color || '#555',
    border: `1px solid ${color || '#333'}60`,
    padding: '3px 10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginRight: '6px',
    marginBottom: '6px',
    display: 'inline-block',
  }}>
    {label}
  </span>
)

const CyclePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cycle, setCycle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchCycle = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getCycleById(id)
        if (res.data?.cycle) {
          setCycle(enrichCycle(res.data.cycle))
        } else if (res.data) {
          setCycle(enrichCycle(res.data))
        } else {
          throw new Error('No cycle data')
        }
      } catch (err) {
        // Fallback to mock data
        const found = MOCK_CYCLES.find(c =>
          c.id === id ||
          c.id === id?.toLowerCase() ||
          c.fullName?.toLowerCase()
            .replace(/\s+/g, '-') === id
        )
        if (found) {
          setCycle(enrichCycle(found))
        } else {
          setError('Cycle not found')
        }
      } finally {
        setLoading(false)
      }

      // Track recently viewed
      try {
        const viewed = JSON.parse(
          localStorage.getItem('recently_viewed') || '[]'
        )
        const filtered = viewed.filter(v => v !== id)
        filtered.unshift(id)
        localStorage.setItem('recently_viewed',
          JSON.stringify(filtered.slice(0, 5)))
      } catch (e) {}
    }
    fetchCycle()
  }, [id])

  if (loading) return (
    <div style={{
      padding: '48px',
      fontFamily: 'DM Mono, monospace',
      color: '#333',
      fontSize: '12px',
      letterSpacing: '3px',
    }}>
      LOADING CYCLE DATA...
    </div>
  )

  if (error || !cycle) return (
    <div style={{
      padding: '48px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '48px',
        color: '#333',
        marginBottom: '16px',
      }}>
        CYCLE NOT FOUND
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '16px',
          letterSpacing: '3px',
          color: '#FFD700',
          background: 'transparent',
          border: '1px solid #FFD700',
          padding: '12px 32px',
          cursor: 'pointer',
        }}
      >
        BACK TO HOME
      </button>
    </div>
  )

  const brandColor = {
    Trek: '#E8142B', Giant: '#00559F',
    Specialized: '#E8102A', Hero: '#FF6B00',
    Hercules: '#2E7D32', Firefox: '#FF4500',
    Cannondale: '#00A651', Scott: '#1565C0',
    Merida: '#6A1B9A', Marin: '#00796B',
    Polygon: '#F57C00', Btwin: '#0277BD',
  }[cycle.brand] || '#FFD700'

  return (
    <div style={{
      background: '#050505',
      minHeight: '100vh',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '32px 40px',
        borderBottom: '1px solid #0D0D0D',
        background: '#020202',
      }}>
        {/* Breadcrumb */}
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '10px',
          color: '#333',
          letterSpacing: '2px',
          marginBottom: '16px',
          cursor: 'pointer',
        }}
          onClick={() => navigate('/')}
        >
          ← ENCYCLOPEDIA / {cycle.brand?.toUpperCase()} / {cycle.name?.toUpperCase()}
        </div>

        {/* Brand + Category */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
        }}>
          <Tag label={cycle.brand} color={brandColor}/>
          <Tag label={cycle.category} color="#555"/>
          <Tag label={cycle.type} color="#333"/>
        </div>

        {/* Cycle Name */}
        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '72px',
          color: '#F0F0F0',
          letterSpacing: '4px',
          lineHeight: '0.9',
          marginBottom: '24px',
        }}>
          {cycle.fullName || `${cycle.brand} ${cycle.name}`}
        </h1>

        {/* Action Bar */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          {[
            { label: '+ COMPARE', action: () => {} },
            { label: '♡ SAVE', action: () => {} },
            { label: '🖨 PRINT', action: () => window.print() },
          ].map((btn, i) => (
            <button key={i}
              onClick={btn.action}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '10px',
                letterSpacing: '2px',
                color: '#444',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                borderBottom: '1px solid transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.target.style.color = '#FFD700'
                e.target.style.borderBottom =
                  '1px solid #FFD700'
              }}
              onMouseLeave={e => {
                e.target.style.color = '#444'
                e.target.style.borderBottom =
                  '1px solid transparent'
              }}
            >
              {btn.label}
            </button>
          ))}
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '28px',
            color: '#FFD700',
            marginLeft: 'auto',
          }}>
            {cycle.pricing?.mrp_inr || cycle.price_inr || '₹32,000'}
          </div>
        </div>

        {/* Skill + Terrain Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Tag
            label={cycle.skillLevel || 'Beginner'}
            color={
              cycle.skillLevel === 'expert' ? '#DC2626' :
              cycle.skillLevel === 'advanced' ? '#F57C00' :
              cycle.skillLevel === 'intermediate' ? '#F0F0F0' :
              '#FFD700'
            }
          />
          {(cycle.terrain || []).map((t, i) => (
            <Tag key={i} label={t} color="#333"/>
          ))}
        </div>
      </div>

      {/* ── ACCORDION SECTIONS ── */}
      <div style={{ maxWidth: '900px' }}>

        {/* OVERVIEW */}
        <AccordionSection
          title="Overview & Identity"
          icon="📌"
          defaultOpen={true}
        >
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            color: '#666',
            lineHeight: '1.8',
            padding: '16px 0',
          }}>
            {cycle.overview?.history ||
              `The ${cycle.fullName} is a ${cycle.category} bicycle designed for ${cycle.overview?.primaryUse || 'versatile riding'}.`}
          </div>
          <SpecRow label="Primary Use"
            value={cycle.overview?.primaryUse}/>
          <SpecRow label="Skill Level"
            value={cycle.overview?.skillLevel}
            highlight/>
          <SpecRow label="Ideal For"
            value={cycle.overview?.idealFor}/>
          <SpecRow label="Not Recommended For"
            value={cycle.overview?.notFor}/>
          {(cycle.overview?.terrain || cycle.terrain || []).length > 0 && (
            <div style={{ paddingTop: '12px' }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '9px',
                color: '#333',
                letterSpacing: '3px',
                marginBottom: '8px',
              }}>TERRAIN</div>
              {(cycle.overview?.terrain || cycle.terrain || []).map((t, i) => (
                <Tag key={i} label={t} color="#444"/>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* FRAME & FORK */}
        <AccordionSection
          title="Frame & Fork"
          icon="🏗️"
        >
          <SpecRow label="Frame Material"
            value={cycle.frame?.material} highlight/>
          <SpecRow label="Frame Type"
            value={cycle.frame?.type}/>
          <SpecRow label="Geometry"
            value={cycle.frame?.geometry}/>
          <SpecRow label="Available Sizes"
            value={(cycle.frame?.sizes || []).join(', ')}/>
          <SpecRow label="Internal Cable Routing"
            value={cycle.frame?.internalCableRouting
              ? 'Yes' : 'No'}/>
          <SpecRow label="Dropper Post Ready"
            value={cycle.frame?.dropperPostReady
              ? 'Yes' : 'No'}/>
          <div style={{
            height: '1px',
            background: '#111',
            margin: '12px 0',
          }}/>
          <SpecRow label="Fork Type"
            value={cycle.fork?.type}/>
          <SpecRow label="Fork Brand"
            value={cycle.fork?.brand} highlight/>
          <SpecRow label="Fork Model"
            value={cycle.fork?.model}/>
          <SpecRow label="Suspension Travel"
            value={cycle.fork?.travel}/>
          <SpecRow label="Fork Material"
            value={cycle.fork?.material}/>
        </AccordionSection>

        {/* WHEEL SYSTEM */}
        <AccordionSection
          title="Wheel System"
          icon="🛞"
        >
          <SpecRow label="Wheel Size"
            value={cycle.wheels?.size} highlight/>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '9px',
            color: '#333',
            letterSpacing: '3px',
            padding: '12px 0 6px',
          }}>FRONT WHEEL</div>
          <SpecRow label="Rim Brand"
            value={cycle.wheels?.front?.rimBrand}/>
          <SpecRow label="Tire Size"
            value={cycle.wheels?.front?.tireSize}
            highlight/>
          <SpecRow label="Tire Brand"
            value={cycle.wheels?.front?.tireBrand}/>
          <SpecRow label="Tire Model"
            value={cycle.wheels?.front?.tireModel}/>
          <SpecRow label="Tubeless Ready"
            value={cycle.wheels?.front?.tubelessReady
              ? 'Yes' : 'No'}/>
          <SpecRow label="Valve Type"
            value={cycle.wheels?.front?.valveType}/>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '9px',
            color: '#333',
            letterSpacing: '3px',
            padding: '12px 0 6px',
          }}>REAR WHEEL</div>
          <SpecRow label="Rim Brand"
            value={cycle.wheels?.rear?.rimBrand}/>
          <SpecRow label="Tire Size"
            value={cycle.wheels?.rear?.tireSize}
            highlight/>
          <SpecRow label="Tire Brand"
            value={cycle.wheels?.rear?.tireBrand}/>
          <SpecRow label="Tubeless Ready"
            value={cycle.wheels?.rear?.tubelessReady
              ? 'Yes' : 'No'}/>
          <SpecRow label="Valve Type"
            value={cycle.wheels?.rear?.valveType}/>
        </AccordionSection>

        {/* DRIVETRAIN */}
        <AccordionSection
          title="Drivetrain"
          icon="⚙️"
        >
          <SpecRow label="Groupset"
            value={cycle.drivetrain?.groupset}
            highlight/>
          <SpecRow label="Speeds"
            value={cycle.drivetrain?.speeds
              ? `${cycle.drivetrain.speeds} Speed` : 'N/A'}/>
          <SpecRow label="Shifter Brand"
            value={cycle.drivetrain?.shifterBrand}/>
          <SpecRow label="Shifter Model"
            value={cycle.drivetrain?.shifterModel}/>
          <SpecRow label="Front Derailleur"
            value={cycle.drivetrain?.frontDerailleur}/>
          <SpecRow label="Rear Derailleur"
            value={cycle.drivetrain?.rearDerailleur}
            highlight/>
          <SpecRow label="Crankset"
            value={cycle.drivetrain?.cranksetBrand}/>
          <SpecRow label="Crankset Model"
            value={cycle.drivetrain?.cranksetModel}/>
          <SpecRow label="Chainring Size"
            value={cycle.drivetrain?.chainringSize}/>
          <SpecRow label="Cassette Range"
            value={cycle.drivetrain?.cassetteRange}
            highlight/>
          <SpecRow label="Chain Brand"
            value={cycle.drivetrain?.chainBrand}/>
          <SpecRow label="Pedals Included"
            value={cycle.drivetrain?.pedalIncluded
              ? 'Yes' : 'No'}/>
        </AccordionSection>

        {/* BRAKES */}
        <AccordionSection
          title="Braking System"
          icon="🛑"
        >
          <SpecRow label="Brake Type"
            value={cycle.brakes?.type} highlight/>
          <SpecRow label="Front Brake"
            value={cycle.brakes?.front}/>
          <SpecRow label="Rear Brake"
            value={cycle.brakes?.rear}/>
          <SpecRow label="Front Rotor Size"
            value={cycle.brakes?.rotorSizeFront}/>
          <SpecRow label="Rear Rotor Size"
            value={cycle.brakes?.rotorSizeRear}/>
          <SpecRow label="Pad Type"
            value={cycle.brakes?.padType}/>
        </AccordionSection>

        {/* COCKPIT */}
        <AccordionSection
          title="Cockpit & Ergonomics"
          icon="🪑"
        >
          <SpecRow label="Handlebar Brand"
            value={cycle.cockpit?.handlebarBrand}/>
          <SpecRow label="Handlebar Width"
            value={cycle.cockpit?.handlebarWidth}
            highlight/>
          <SpecRow label="Stem Length"
            value={cycle.cockpit?.stemLength}/>
          <SpecRow label="Grips"
            value={cycle.cockpit?.gripsBrand}/>
          <SpecRow label="Saddle Brand"
            value={cycle.cockpit?.saddleBrand}/>
          <SpecRow label="Saddle Model"
            value={cycle.cockpit?.saddleModel}/>
          <SpecRow label="Seatpost Diameter"
            value={cycle.cockpit?.seatpostDiameter}/>
          <SpecRow label="Dropper Post"
            value={cycle.cockpit?.dropperPost
              ? `Yes - ${cycle.cockpit.dropperTravel}`
              : 'No'}/>
        </AccordionSection>

        {/* PRICING */}
        <AccordionSection
          title="Pricing & Availability"
          icon="💰"
        >
          <SpecRow label="MRP (India)"
            value={cycle.pricing?.mrp_inr}
            highlight/>
          <SpecRow label="MRP (USD)"
            value={cycle.pricing?.mrp_usd}/>
          <SpecRow label="Street Price"
            value={cycle.pricing?.street_inr}/>
          <SpecRow label="Segment"
            value={cycle.pricing?.segment}/>
          <div style={{ paddingTop: '12px' }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '9px',
              color: '#333',
              letterSpacing: '3px',
              marginBottom: '8px',
            }}>AVAILABLE AT</div>
            {(cycle.pricing?.availableAt || []).map((store, i) => (
              <div key={i} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#555',
                padding: '4px 0',
                borderBottom: '1px solid #0D0D0D',
              }}>→ {store}</div>
            ))}
          </div>
        </AccordionSection>

        {/* MAINTENANCE */}
        <AccordionSection
          title="Maintenance Guide"
          icon="🛠️"
        >
          <SpecRow label="Service Interval"
            value={cycle.maintenance?.serviceInterval}/>
          <SpecRow label="Chain Lube Frequency"
            value={cycle.maintenance?.chainLubeFreq}/>
          <SpecRow label="Annual Cost (India)"
            value={cycle.maintenance?.annualCost_inr}
            highlight/>
          <SpecRow label="Spare Availability"
            value={cycle.maintenance?.spareAvailability}/>
          {(cycle.maintenance?.commonIssues || []).length > 0 && (
            <div style={{ paddingTop: '12px' }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '9px',
                color: '#333',
                letterSpacing: '3px',
                marginBottom: '8px',
              }}>COMMON ISSUES</div>
              {cycle.maintenance.commonIssues.map((issue, i) => (
                <div key={i} style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: '#555',
                  padding: '6px 0',
                  borderBottom: '1px solid #0D0D0D',
                  display: 'flex',
                  gap: '8px',
                }}>
                  <span style={{ color: '#DC2626' }}>⚠</span>
                  {issue}
                </div>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* UPGRADES */}
        <AccordionSection
          title="Upgrade Recommendations"
          icon="⬆️"
        >
          {(cycle.upgrades || []).length > 0 ? (
            cycle.upgrades.map((upgrade, i) => (
              <div key={i} style={{
                background: '#0C0C0C',
                border: '1px solid #141414',
                padding: '14px',
                marginBottom: '8px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                }}>
                  <span style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '16px',
                    color: '#F0F0F0',
                    letterSpacing: '2px',
                  }}>
                    {upgrade.part}
                  </span>
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '9px',
                    color: upgrade.priority === 'high'
                      ? '#DC2626'
                      : upgrade.priority === 'medium'
                      ? '#FFD700'
                      : '#555',
                    border: `1px solid ${
                      upgrade.priority === 'high'
                        ? '#DC262660'
                        : upgrade.priority === 'medium'
                        ? '#FFD70060'
                        : '#33333360'
                    }`,
                    padding: '2px 8px',
                    letterSpacing: '2px',
                  }}>
                    {upgrade.priority?.toUpperCase()}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '11px',
                  color: '#FFD700',
                  marginBottom: '4px',
                }}>
                  {upgrade.suggestion}
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '11px',
                  color: '#555',
                  marginBottom: '6px',
                }}>
                  {upgrade.reason}
                </div>
                <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '12px',
                  color: '#FFD700',
                }}>
                  {upgrade.cost_inr}
                </div>
              </div>
            ))
          ) : (
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#333',
              padding: '16px 0',
            }}>
              No upgrade recommendations available
            </div>
          )}
        </AccordionSection>

        {/* VERSION HISTORY */}
        <AccordionSection
          title="Version History"
          icon="📅"
        >
          {(cycle.versions || []).length > 0 ? (
            cycle.versions.map((v, i) => (
              <div key={i} style={{
                padding: '14px 0',
                borderBottom: '1px solid #0D0D0D',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}>
                  <span style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '20px',
                    color: '#FFD700',
                    letterSpacing: '3px',
                  }}>
                    {v.year}
                  </span>
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '13px',
                    color: '#FFD700',
                  }}>
                    {v.price_inr}
                  </span>
                </div>
                {(v.changes || []).map((change, j) => (
                  <div key={j} style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#555',
                    padding: '2px 0',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#FFD700',
                      flexShrink: 0,
                    }}/>
                    {change}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#333',
              padding: '16px 0',
            }}>
              Version history not available
            </div>
          )}
        </AccordionSection>

        {/* PROS */}
        <AccordionSection
          title="Strengths & Pros"
          icon="🏆"
        >
          {(cycle.pros || []).length > 0 ? (
            cycle.pros.map((pro, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                padding: '8px 0',
                borderBottom: '1px solid #0D0D0D',
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#FFD700',
                  marginTop: '5px',
                  flexShrink: 0,
                }}/>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  color: '#888',
                  lineHeight: '1.6',
                }}>
                  {pro}
                </span>
              </div>
            ))
          ) : (
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#333',
              padding: '16px 0',
            }}>
              No pros listed
            </div>
          )}
        </AccordionSection>

        {/* CONS */}
        <AccordionSection
          title="Weaknesses & Cons"
          icon="❌"
        >
          {(cycle.cons || []).length > 0 ? (
            cycle.cons.map((con, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                padding: '8px 0',
                borderBottom: '1px solid #0D0D0D',
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#DC2626',
                  marginTop: '5px',
                  flexShrink: 0,
                }}/>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  {con}
                </span>
              </div>
            ))
          ) : (
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#333',
              padding: '16px 0',
            }}>
              No cons listed
            </div>
          )}
        </AccordionSection>

        {/* WHO IS IT FOR */}
        <AccordionSection
          title="Who Is It For"
          icon="🎯"
        >
          <div style={{
            padding: '16px 0',
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '9px',
              color: '#333',
              letterSpacing: '3px',
              marginBottom: '8px',
            }}>IDEAL FOR</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#888',
              lineHeight: '1.8',
              marginBottom: '20px',
              padding: '12px',
              background: '#0C0C0C',
              borderLeft: '2px solid #FFD700',
            }}>
              {cycle.overview?.idealFor ||
                'Riders looking for a reliable all-round bicycle'}
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '9px',
              color: '#333',
              letterSpacing: '3px',
              marginBottom: '8px',
            }}>NOT RECOMMENDED FOR</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.8',
              padding: '12px',
              background: '#0C0C0C',
              borderLeft: '2px solid #DC2626',
            }}>
              {cycle.overview?.notFor ||
                'Professional competitive racing'}
            </div>
          </div>
        </AccordionSection>

      </div>

      {/* ── FOOTER ── */}
      <div style={{
        padding: '32px 40px',
        borderTop: '1px solid #0D0D0D',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#444',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← BACK TO ENCYCLOPEDIA
        </button>
        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '8px',
          color: '#222',
          letterSpacing: '3px',
        }}>
          P23 | CYCHIGH | MADE BY PUJIT BALANTHIRAN
        </div>
      </div>

    </div>
  )
}

export default CyclePage
