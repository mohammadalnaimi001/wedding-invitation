import {
  ArrowDown,
  ArrowUpLeft,
  CameraOff,
  Clock3,
  MapPin,
  Mic2,
  Heart,
} from "lucide-react";
import {
  weddingConfig as c,
  formatDate,
  formatTime,
} from "@/lib/wedding-config";
import { AddToCalendar, ShareButton, WhatsAppLink } from "./InvitationActions";
import { Botanical, Lantern, Ornament, Particles } from "./Ornaments";
import { Countdown } from "./Countdown";
export function QuranSection() {
  return (
    <section className="quran-section" aria-label="آية من القرآن الكريم">
      <div className="quran-inner">
        <p id="invitation-start" tabIndex={-1} className="basmala">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="quran-verse">
          ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا
          لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ
          إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ ﴾
        </p>
        <p className="verse-source">سورة الروم · الآية ٢١</p>
        <Ornament />
      </div>
    </section>
  );
}
export function CoupleNames() {
  return (
    <div className="couple-names" data-reveal>
      <h1>
        <span className="groom-name">{c.groomShortName}</span>
        <span className="groom-family">
          {c.groomName.slice(c.groomShortName.length).trim()}
        </span>
        <span className="couple-join">
          <span />
          <Heart size={21} strokeWidth={1} />
          <span />
        </span>
        <span className="bride-name">{c.brideName}</span>
      </h1>
    </div>
  );
}
export function InvitationSection() {
  return (
    <section id="invitation" className="invitation-section section-anchor">
      <div className="botanical-art" role="presentation" />
      <Particles />
      <div className="invitation-paper">
        <div className="arch-border" aria-hidden="true" />
        <div className="invitation-copy">
          <span className="eyebrow" data-reveal>
            بكل الحب والفرح والسرور
          </span>
          <p className="honored" data-reveal>
            يتشرف
          </p>
          <div className="fathers" data-reveal>
            <p>
              <small>السيد</small>
              {c.groomFather}
            </p>
            <span className="fathers-and">و</span>
            <p>
              <small>السيد</small>
              {c.brideFather}
            </p>
          </div>
          <p className="invitation-line" data-reveal>
            بدعوتكم لمشاركتهم فرحتهم وحضور حفل زفاف
          </p>
          <CoupleNames />
          <p className="couple-blessing" data-reveal>
            وبحضوركم تكتمل فرحتنا
          </p>
          <div className="hero-date" data-reveal>
            <span>{formatDate(c.weddingDate, { weekday: "long" })}</span>
            <strong dir="ltr">
              {c.weddingDate.split("-").reverse().join(" . ")}
            </strong>
            <span>{c.venueName}</span>
          </div>
          <a
            className="scroll-invitation"
            href="#details"
            aria-label="انتقل إلى تفاصيل الحفل"
          >
            <ArrowDown size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function WeddingDetails() {
  return (
    <section id="details" className="details-section section-anchor">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">ليلةٌ نكتب فيها أول الحكاية</span>
        <h2>موعد الفرح</h2>
        <Ornament />
      </div>
      <div className="date-display" data-reveal>
        <span>{formatDate(c.weddingDate, { weekday: "long" })}</span>
        <strong>
          {new Intl.DateTimeFormat("ar-EG", {
            day: "numeric",
            timeZone: c.timeZone,
          }).format(new Date(`${c.weddingDate}T12:00:00${c.utcOffset}`))}
        </strong>
        <span>
          {formatDate(c.weddingDate, { month: "long", year: "numeric" })}
        </span>
      </div>
      <div className="time-line" data-reveal>
        <div>
          <Clock3 size={17} />
          <span>بداية الفرح</span>
          <strong dir="ltr">
            {formatTime(c.weddingStartTime)} <small>مساءً</small>
          </strong>
        </div>
        <div className="time-thread" aria-hidden="true">
          <i />
          <span />
          <i />
        </div>
        <div>
          <Heart size={17} />
          <span>ختام الليلة</span>
          <strong dir="ltr">
            {formatTime(c.weddingEndTime)} <small>مساءً</small>
          </strong>
        </div>
      </div>
      <p className="timezone-note">بتوقيت عمّان</p>
      <Countdown />
      <div className="center" data-reveal>
        <AddToCalendar />
      </div>
    </section>
  );
}
export function ArtistSection() {
  return (
    <section className="artist-section" aria-labelledby="artist-heading">
      <div className="artist-content" data-reveal>
        <Mic2 className="artist-mic" size={30} strokeWidth={1.2} />
        <div>
          <span className="eyebrow">يحيي الحفل</span>
          <p>الفنان</p>
          <h2 id="artist-heading">{c.artistName}</h2>
        </div>
        <div className="sound-wave" aria-hidden="true">
          {Array.from({ length: 19 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${Math.round(12 + Math.sin(i * 1.8) ** 2 * 35)}px`,
                animationDelay: `${(i * 0.14).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
        <Botanical className="artist-botanical" />
      </div>
    </section>
  );
}
export function LocationSection() {
  return (
    <section id="location" className="location-section section-anchor">
      <div className="location-copy" data-reveal>
        <span className="eyebrow">هنا نجتمع على الفرح</span>
        <h2>موقع الحفل</h2>
        <Ornament />
        <h3>{c.venueName}</h3>
        <p>
          <MapPin size={17} />
          {c.venueAddress}
        </p>
        <a
          className="button button-emerald"
          href={c.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={18} />
          افتح الموقع على Google Maps
          <ArrowUpLeft size={17} />
        </a>
      </div>
      <div className="venue-panel" data-reveal>
        {c.mapsEmbedUrl ? (
          <iframe
            title={`خريطة ${c.venueName}`}
            src={c.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <a
            href={c.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-address-card"
            aria-label={`افتح اتجاهات الوصول إلى ${c.venueName}`}
          >
            <div className="venue-arch" />
            <MapPin className="venue-pin" size={34} strokeWidth={1} />
            <span className="eyebrow">عمّان، الأردن</span>
            <strong>{c.venueName}</strong>
            <span>{c.venueAddress}</span>
            <Ornament />
            <span className="venue-link">
              نلقاكم على خير
              <ArrowUpLeft size={17} />
            </span>
            <Botanical className="venue-leaf" />
          </a>
        )}
      </div>
    </section>
  );
}
export function HennaSection() {
  return (
    <section id="henna" className="henna-section section-anchor">
      <div className="henna-pattern" aria-hidden="true" />
      <Lantern className="lantern-one" />
      <Lantern className="lantern-two" />
      <Particles dark />
      <div className="henna-content" data-reveal>
        <span className="eyebrow">وقبل الفرح… ليلة من تراثنا</span>
        <h2>ليلة الحنّاء</h2>
        <Ornament />
        <p className="henna-intro">نشارككم فرحتنا في ليلةٍ من أجمل الليالي</p>
        <div className="henna-details">
          <div>
            <span>{formatDate(c.hennaDate, { weekday: "long" })}</span>
            <strong>{formatDate(c.hennaDate)}</strong>
          </div>
          <i />
          <div>
            <MapPin size={18} />
            <strong>{c.hennaLocation}</strong>
          </div>
        </div>
        {c.hennaMapsUrl && (
          <a
            className="button button-gold"
            href={c.hennaMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={18} />
            موقع الحناء
          </a>
        )}
      </div>
    </section>
  );
}
export function PrivacyNotice() {
  return (
    <section className="privacy-section">
      <div className="privacy-card" data-reveal>
        <div className="privacy-icon">
          <CameraOff size={27} strokeWidth={1.1} />
        </div>
        <h2>خصوصية أفراحنا تهمنا</h2>
        <p>{c.photoNotice}</p>
      </div>
    </section>
  );
}
export function GroomZaffaSection() {
  return (
    <section
      id="groom-zaffa"
      className="henna-section section-anchor"
      aria-labelledby="groom-zaffa-heading"
    >
      <div className="henna-pattern" aria-hidden="true" />
      <Particles dark />
      <div className="henna-content" data-reveal>
        <span className="eyebrow">في يوم الفرح</span>
        <h2 id="groom-zaffa-heading">زفّة العريس</h2>
        <Ornament />
        <div className="henna-details">
          <div>
            <span>{formatDate(c.weddingDate, { weekday: "long" })}</span>
            <strong>{formatDate(c.weddingDate)}</strong>
          </div>
          <i aria-hidden="true" />
          <div>
            <Clock3 size={18} aria-hidden="true" />
            <strong>
              <span dir="ltr">{formatTime(c.groomZaffaTime)}</span> مساءً
            </strong>
            <span>بتوقيت عمّان</span>
          </div>
        </div>
        <a
          className="button button-gold"
          href={c.groomZaffaMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={18} aria-hidden="true" />
          موقع زفّة العريس
        </a>
      </div>
    </section>
  );
}
export function ClosingSection() {
  return (
    <footer className="closing-section">
      <Botanical className="closing-leaf closing-leaf-right" />
      <Botanical className="closing-leaf closing-leaf-left" />
      <div data-reveal>
        <Ornament />
        <p className="closing-phrase">وبحضوركم تكتمل فرحتنا</p>
        <p className="closing-names">
          {c.groomShortName}
          <Heart size={22} strokeWidth={1} />
          {c.brideName}
        </p>
        <p className="closing-blessing">دامت الأفراح عامرة في دياركم</p>
        <div className="footer-actions">
          <ShareButton />
          <AddToCalendar />
        </div>
        <WhatsAppLink />
        <p className="credit" lang="en" dir="ltr">
          Designed with Love <span>♡</span>
        </p>
      </div>
    </footer>
  );
}
