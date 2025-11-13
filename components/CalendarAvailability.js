// components/CalendarAvailability.js
"use client";

import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export default function CalendarAvailability({ settings }) {
  const {
    title = "Disponibilités",
    subtitle = "Prochaines dateees pour vos prestations",
    busyDates = [],
    vacationDates = [],
  } = settings || {};

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selected, setSelected] = useState(null);

  const today = dayjs().startOf("day");

  const startOfMonth = currentMonth.startOf("month");
  const startWeekday = startOfMonth.day(); // 0 = dimanche
  const offset = startWeekday === 0 ? 6 : startWeekday - 1;

  const days = [];
  for (let i = 0; i < offset; i++) {
    days.push(null);
  }
  for (let d = 1; d <= currentMonth.daysInMonth(); d++) {
    days.push(
      dayjs(`${currentMonth.format("YYYY-MM")}-${String(d).padStart(2, "0")}`)
    );
  }

  const getStatus = (dateObj) => {
    const formatted = dateObj.format("YYYY-MM-DD");

    if (vacationDates.includes(formatted)) return "vacation";
    if (busyDates.includes(formatted)) return "busy";
    if (dateObj.isBefore(today)) return "past";

    return "available";
  };

  const handleSelect = (dateObj) => {
    if (!dateObj) return;
    const status = getStatus(dateObj);
    if (status === "past" || status === "vacation") return;
    setSelected(dateObj.format("YYYY-MM-DD"));
  };

  return (
    <div className="availability-card">
      {/* HEADER */}
      <div className="availability-card__header">
        <div>
          <h3 className="availability-card__title">{title}</h3>
          <p className="availability-card__subtitle">{subtitle}</p>
        </div>

        <div className="availability-card__nav">
          <button
            type="button"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            aria-label="Mois précédent"
          >
            ◀
          </button>
          <span className="availability-card__nav-month">
            {currentMonth.format("MMMM YYYY")}
          </span>
          <button
            type="button"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            aria-label="Mois suivant"
          >
            ▶
          </button>
        </div>
      </div>

      {/* JOURS DE LA SEMAINE */}
      <div className="availability-card__weekdays">
        {["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"].map((d) => (
          <div key={d} className="availability-card__weekday">
            {d}
          </div>
        ))}
      </div>

      {/* GRILLE DES JOURS */}
      <div className="availability-card__grid">
        {days.map((dateObj, idx) => {
          if (!dateObj) {
            return (
              <div
                key={`empty-${idx}`}
                className="availability-card__cell availability-card__cell--empty"
              />
            );
          }

          const status = getStatus(dateObj);
          const isSelected =
            selected && selected === dateObj.format("YYYY-MM-DD");
          const isToday = dateObj.isSame(today, "day");

          const classes = [
            "availability-card__cell",
            `availability-card__cell--${status}`,
            isSelected ? "availability-card__cell--selected" : "",
            isToday ? "availability-card__cell--today" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={dateObj.format("YYYY-MM-DD")}
              type="button"
              className={classes}
              onClick={() => handleSelect(dateObj)}
            >
              <span>{dateObj.date()}</span>
            </button>
          );
        })}
      </div>

      {/* LÉGENDE */}
      <div className="availability-card__legend">
        <div className="availability-card__legend-item">
          <span className="availability-card__dot availability-card__dot--available" />
          <span>Disponible</span>
        </div>
        <div className="availability-card__legend-item">
          <span className="availability-card__dot availability-card__dot--busy" />
          <span>Indisponible / déjà réservé</span>
        </div>
        <div className="availability-card__legend-item">
          <span className="availability-card__dot availability-card__dot--vacation" />
          <span>Congés / vacances</span>
        </div>
      </div>
    </div>
  );
}