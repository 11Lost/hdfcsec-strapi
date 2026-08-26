'use client'
import React, { useState } from 'react';
import { Calendar, Filter, Clock, Volume2, ChevronDown, Star } from 'lucide-react';
import './CalendarEvent.css';

export default function CalendarEvent() {
  const [activeTab, setActiveTab] = useState('Economic Calendar');

  const tabs = [
    'Economic Calendar',
    'Holidays',
    'Earnings',
    'Dividends',
    'Splits',
    'IPO',
    'Expiration'
  ];

  const events = [
    { time: '05:00', country: '🇺🇸 USD', impact: 1, name: 'OPEC Meeting', speaker: true, actual: '', forecast: '', previous: '' },
    { time: '12:30', country: '🇯🇵 JPY', impact: 1, name: 'FOMC Member Kashkari Speaks', speaker: true, actual: '', forecast: '', previous: '' },
    { time: '05:00', country: '🇨🇳 CNY', impact: 2, name: 'Caixin Services PMI (Dec)', speaker: false, actual: '6.3%', forecast: '', previous: '4.4%', actualClass: 'text-white', previousClass: 'text-red' },
    { time: '05:00', country: '🇪🇸 EUR', impact: 1, name: 'Retail Sales (YoY) (Nov)', speaker: false, actual: '2.3%', forecast: '2.5%', previous: '2.2%', actualClass: 'text-red', previousClass: 'text-red' },
    { time: '05:00', country: '🇯🇵 JPY', impact: 2, name: 'procure.ch PMI (Dec)', speaker: false, actual: '50.0', forecast: '49.7', previous: '48.7', actualClass: 'text-white', previousClass: 'text-white' },
    { time: '05:00', country: '🇺🇸 USD', impact: 1, name: 'BoE Consumer Credit (Nov)', speaker: false, actual: '2.077B', forecast: '', previous: '1.713B', actualClass: 'text-white', previousClass: 'text-green' },
  ];

  const marketMovers = [
    { impact: 'High Impact', impactClass: 'impact-high', title: 'RBI Monetary Policy Decision', date: '1 March 2026' },
    { impact: 'Low Impact', impactClass: 'impact-low', title: 'Q3 Earnings Season Begins', date: '5 March 2026' },
    { impact: 'High Impact', impactClass: 'impact-high', title: 'Union Budget Announcement', date: '10 March 2026' },
    { impact: 'Low Impact', impactClass: 'impact-low', title: 'Q3 Earnings Season Begins', date: '12 March 2026' },
  ];

  const renderStars = (impact: number) => {
    return (
      <div className="ce-stars">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= impact ? 'ce-star-active' : 'ce-star-inactive'}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="ce-section">
      <div className="container">
        <h2 id="calendarTitle" className="calendar-title">
          Calendar Event
        </h2>
        <div className="ce-wrapper">
          <div className="ce-layout">

            {/* Left Section */}
            <div className="ce-main">
              {/* Tabs */}
              <div className="ce-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`ce-tab ${activeTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Filters Bar */}
              <div className="ce-filters">
                <div className="ce-filters-left">
                  <button className="ce-filter-btn primary">
                    <span>Select Period</span>
                    <ChevronDown size={16} />
                  </button>
                  <button className="ce-icon-btn">
                    <Calendar size={20} />
                  </button>
                </div>
                <div className="ce-filters-right">
                  <button className="ce-icon-btn">
                    <Filter size={18} />
                  </button>
                  <div className="ce-divider"></div>
                  <button className="ce-time-btn">
                    <Clock size={16} />
                    <span>15:54 (UTC+5:30)</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="ce-table-wrapper">
                <table className="ce-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Country</th>
                      <th>
                        <div className="ce-th-imp">
                          <span>Imp.</span>
                          <div className="ce-sort-arrows">
                            <div className="ce-sort-up"></div>
                            <div className="ce-sort-down"></div>
                          </div>
                        </div>
                      </th>
                      <th>Event</th>
                      <th className="align-right">Actual</th>
                      <th className="align-right">Forecast</th>
                      <th className="align-right">Previous</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <td>{event.time}</td>
                        <td>
                          <div className="ce-country">{event.country}</div>
                        </td>
                        <td>{renderStars(event.impact)}</td>
                        <td>
                          <div className="ce-event-name">
                            <span>{event.name}</span>
                            {event.speaker && <Volume2 size={14} className="ce-speaker-icon" />}
                          </div>
                        </td>
                        <td className={`align-right ${event.actualClass || ''}`}>
                          {event.actual}
                        </td>
                        <td className="align-right">{event.forecast}</td>
                        <td className={`align-right ${event.previousClass || ''}`}>
                          {event.previous}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Section - What Could Move Markets */}
            <div className="ce-sidebar">
              <div className="ce-sidebar-card">
                <h3 className="ce-sidebar-title">What Could Move Markets</h3>
                <div className="ce-movers-list">
                  {marketMovers.map((mover, index) => (
                    <div key={index} className="ce-mover-item">
                      <div className="ce-mover-badge-wrapper">
                        <span className={`ce-mover-badge ${mover.impactClass}`}>
                          {mover.impact}
                        </span>
                      </div>
                      <h4 className="ce-mover-title">{mover.title}</h4>
                      <span className="ce-mover-date">{mover.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
