import { LitElement, html } from 'lit';
import './media-gallery-item.js';

class MediaGallery extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    data: { type: Object },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.data = { resources: [] }; // Updated to match the new data structure
    this.loading = true; // Set the loading state to true initially
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.loading = false; // Simulate loading completion
    }, 1000); // Simulate some loading time
  }

  determineMediaType(url) {
    return url.includes('/video/') ? 'video' : 'image';
  }

  render() {
    const { resources } = this.data;
    const hasResources = resources && resources.length > 0;

    if (this.loading) {
      return html`<p class="text p-4">Loading gallery...</p>`;
    }

    return html`
      <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 place-items-center"
      >
        ${!hasResources
          ? html`<p class="text p-4">
              No media tagged as <b>nodejs-sample</b>
            </p>`
          : resources.map(
              (resource) => html`
                <div class="p-4">
                  <media-gallery-item
                    src="${resource}"
                    alt="${this.determineMediaType(resource)}"
                    type="${this.determineMediaType(resource)}"
                  ></media-gallery-item>
                </div>
              `
            )}
      </div>
    `;
  }
}

customElements.define('media-gallery', MediaGallery);
