import { HeartHandshake } from "lucide-react";

function FooterQuote() {
  return (
    <section className="footer-section">

      <div className="footer-card">

        <div className="footer-icon">
          <HeartHandshake size={45} />
        </div>

        <h2>
          Every Lost Item Has A Story
        </h2>

        <p>
          Help someone smile today by returning
          what they lost. Every act of kindness
          makes our campus a better place.
        </p>

        <button className="footer-btn">
          Report an Item
        </button>

      </div>

    </section>
  );
}

export default FooterQuote;