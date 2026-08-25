'use client';

export default function CalendarEvent() {
  return (
    <section className="calendar-section">
      <div className="container">
        <h2 id="calendarTitle" className="calendar-title">
          Calendar Event
        </h2>
        <div className="calendar-layout">
          <div className="calendar-content">
            <div
              id="tvEconomicCalendar"
              className="tv-widget-container"
              style={{ height: 500 }}
            />
          </div>

          <div className="calendar-sidebar">
            <h3 className="calendar-sidebar-title">
              What Could Move Markets
            </h3>
            <div className="calendar-market-list">
              <div className="calendar-market-item">
                <span className="calendar-market-badge high">
                  High Impact
                </span>
                <h4 className="calendar-market-name">
                  RBI Monetary Policy Decision
                </h4>
                <p className="calendar-market-date">1 March 2026</p>
              </div>
              <div className="calendar-market-item">
                <span className="calendar-market-badge low">
                  Low Impact
                </span>
                <h4 className="calendar-market-name">
                  Q3 Earnings Season Begins
                </h4>
                <p className="calendar-market-date">5 March 2026</p>
              </div>
              <div className="calendar-market-item">
                <span className="calendar-market-badge high">
                  High Impact
                </span>
                <h4 className="calendar-market-name">
                  Union Budget Announcement
                </h4>
                <p className="calendar-market-date">10 March 2026</p>
              </div>
              <div className="calendar-market-item">
                <span className="calendar-market-badge low">
                  Low Impact
                </span>
                <h4 className="calendar-market-name">
                  Q3 Earnings Season Begins
                </h4>
                <p className="calendar-market-date">12 March 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
