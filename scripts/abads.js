class ABBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const res = await fetch("AB-Ads/scripts/data/data-ads.json");
    const ads = await res.json();
    const bannerAds = ads.filter(ad => ad.type === "banner");
    const ad = bannerAds[Math.floor(Math.random() * bannerAds.length)];
    this.render(ad);
  }

  render(ad) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          max-width: 100%;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 10px 0;
        }

        .ad-banner {
          display: block;
          width: 100%;
          cursor: pointer;
        }

        .info-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
        }

        .options {
          position: absolute;
          top: 40px;
          right: 8px;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          border-radius: 8px;
          display: none;
          flex-direction: column;
          min-width: 150px;
          padding-top: 6px;
        }

        .brand {
          font-size: 12px;
          color: #666;
          padding: 5px 12px;
          border-bottom: 1px solid #eee;
          font-weight: bold;
        }

        .options button {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
        }

        .options button:hover {
          background: #f3f3f3;
        }
      </style>

      <a href="${ad.link}" target="_blank">
        <img class="ad-banner" src="${ad.image}" alt="${ad.title}">
      </a>

      <button class="info-btn">ⓘ</button>

      <div class="options">
        <div class="brand">AB Ads</div>
        <button class="close-ad">Tutup iklan</button>
        <button class="refresh-ad">Jangan tampilkan iklan ini</button>
      </div>
    `;

    const infoBtn = this.shadowRoot.querySelector(".info-btn");
    const options = this.shadowRoot.querySelector(".options");
    const closeBtn = this.shadowRoot.querySelector(".close-ad");
    const refreshBtn = this.shadowRoot.querySelector(".refresh-ad");

    infoBtn.onclick = () => {
      options.style.display = options.style.display === "flex" ? "none" : "flex";
    };

    closeBtn.onclick = () => this.remove();

    refreshBtn.onclick = async () => {
      const res = await fetch("AB-Ads/scripts/data/data-ads.json");
      const ads = await res.json();
      const bannerAds = ads.filter(ad => ad.type === "banner");
      const newAd = bannerAds[Math.floor(Math.random() * bannerAds.length)];
      this.render(newAd);
    };
  }
}

class ABNativeBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const res = await fetch("AB-Ads/scripts/data/data-ads.json");
    const ads = await res.json();
    const nativeAds = ads.filter(ad => ad.type === "native");
    const ad = nativeAds[Math.floor(Math.random() * nativeAds.length)];
    this.render(ad);
  }

  render(ad) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          padding: 12px;
          background: #fff;
          font-family: 'Arial', sans-serif;
          margin: 10px 0;
          position: relative;
        }

        .ad-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
        }

        .info {
          flex: 1;
        }

        .title {
          font-weight: bold;
          font-size: 16px;
        }

        .desc {
          font-size: 14px;
          color: #555;
          margin-top: 4px;
        }

        .cta {
          margin-top: 8px;
          display: inline-block;
          background: #007bff;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
        }

        .info-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
        }

        .options {
          position: absolute;
          top: 40px;
          right: 8px;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          border-radius: 8px;
          display: none;
          flex-direction: column;
          min-width: 150px;
          padding-top: 6px;
        }

        .brand {
          font-size: 12px;
          color: #666;
          padding: 5px 12px;
          border-bottom: 1px solid #eee;
          font-weight: bold;
        }

        .options button {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
        }

        .options button:hover {
          background: #f3f3f3;
        }
      </style>

      <div class="ad-container">
        <img src="${ad.image}" alt="${ad.title}">
        <div class="info">
          <div class="title">${ad.title}</div>
          <div class="desc">${ad.desc}</div>
          <a class="cta" href="${ad.link}" target="_blank">Kunjungi</a>
        </div>
      </div>

      <button class="info-btn">ⓘ</button>

      <div class="options">
        <div class="brand">AB Ads</div>
        <button class="close-ad">Tutup iklan</button>
        <button class="refresh-ad">Jangan tampilkan iklan ini</button>
      </div>
    `;

    const infoBtn = this.shadowRoot.querySelector(".info-btn");
    const options = this.shadowRoot.querySelector(".options");
    const closeBtn = this.shadowRoot.querySelector(".close-ad");
    const refreshBtn = this.shadowRoot.querySelector(".refresh-ad");

    infoBtn.onclick = () => {
      options.style.display = options.style.display === "flex" ? "none" : "flex";
    };

    closeBtn.onclick = () => this.remove();

    refreshBtn.onclick = async () => {
      const res = await fetch("AB-Ads/scripts/data/data-ads.json");
      const ads = await res.json();
      const nativeAds = ads.filter(ad => ad.type === "native");
      const newAd = nativeAds[Math.floor(Math.random() * nativeAds.length)];
      this.render(newAd);
    };
  }
}

// ▶ Native Banner Square 1:1
class ABNativeBannerSquare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const res = await fetch("AB-Ads/scripts/data/data-ads.json");
    const ads = await res.json();
    const squareAds = ads.filter(ad => ad.type === "native-square");
    const ad = squareAds[Math.floor(Math.random() * squareAds.length)];
    this.render(ad);
  }

  render(ad) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          overflow: hidden;
          background: white;
          padding: 12px;
          margin: 12px 0;
          width: 210px;
          position: relative;
          font-family: Arial, sans-serif;
        }

        .card {
          text-align: center;
        }

        img {
          width: 170px;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 14px;
        }

        .title {
          margin-top: 10px;
          font-size: 16px;
          font-weight: bold;
        }

        .desc {
          font-size: 14px;
          color: #555;
          margin-top: 4px;
        }

        .cta {
          margin-top: 10px;
          display: inline-block;
          background: #007bff;
          color: white;
          padding: 6px 14px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
        }

        .info-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
        }

        .options {
          position: absolute;
          top: 40px;
          right: 8px;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          border-radius: 8px;
          display: none;
          flex-direction: column;
          min-width: 150px;
          padding-top: 6px;
        }

        .brand {
          font-size: 12px;
          color: #666;
          padding: 5px 12px;
          border-bottom: 1px solid #eee;
          font-weight: bold;
        }

        .options button {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
        }

        .options button:hover {
          background: #f3f3f3;
        }
        
      </style>

      <div class="card">
        <img src="${ad.image}" alt="ad">
        <div class="title">${ad.title}</div>
        <div class="desc">${ad.desc}</div>
        <a class="cta" href="${ad.link}" target="_blank">Kunjungi</a>
      </div>

      <button class="info-btn">ⓘ</button>
      <div class="options">
        <div class="brand">AB Ads</div>
        <button class="close-ad">Tutup iklan</button>
        <button class="refresh-ad">Jangan tampilkan iklan ini</button>
      </div>
    `;

    const infoBtn = this.shadowRoot.querySelector(".info-btn");
    const options = this.shadowRoot.querySelector(".options");
    const closeBtn = this.shadowRoot.querySelector(".close-ad");
    const refreshBtn = this.shadowRoot.querySelector(".refresh-ad");

    infoBtn.onclick = () =>
      (options.style.display = options.style.display === "flex" ? "none" : "flex");

    closeBtn.onclick = () => this.remove();

    refreshBtn.onclick = async () => {
      const res = await fetch("AB-Ads/scripts/data/data-ads.json");
      const ads = await res.json();
      const squareAds = ads.filter(ad => ad.type === "native-square");
      const newAd = squareAds[Math.floor(Math.random() * squareAds.length)];
      this.render(newAd);
    };
  }
}

customElements.define("ab-banner", ABBanner);
customElements.define("ab-native-banner", ABNativeBanner);
customElements.define("ab-native-banner-square", ABNativeBannerSquare);