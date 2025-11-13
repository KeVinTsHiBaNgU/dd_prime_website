// app/devis/page.js
import { getDevisPage, getDevisCalendar } from "@/lib/cms";
import DevisForm from "@/components/DevisForm";
import CalendarAvailability from "@/components/CalendarAvailability";

export const dynamic = "force-dynamic";

export default async function DevisPage() {
  const [content, calendarSettings] = await Promise.all([
    getDevisPage(),
    getDevisCalendar(),
  ]);

  return (
    <section className="devis section" id="devis">
      <div className="container devis__layout">
        {/* Colonne gauche : intro + formulaire */}
        <DevisForm content={content} />

        {/* Colonne droite : calendrier */}
        <div className="devis__calendar-wrapper">
          <div className="devis__calendar-row">
            <div className="devis__calendar-box">
              <CalendarAvailability settings={calendarSettings} />
            </div>

            <div className="devis__calendar-box devis__calendar-photo">
              <img
                src={content.teamImage || "/placeholder.jpg"}
                alt="Notre équipe événementielle"
                className="devis__calendar-photo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
