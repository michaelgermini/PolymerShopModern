import { LitElement, html, css } from 'lit';

export class TestComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background: #f0f0f0;
      border: 2px solid #333;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
  `;

  render() {
    return html`
      <h1>Lit Test Component</h1>
      <p>If you can see this, Lit is working!</p>
      <button @click=${this.handleClick}>Click me</button>
    `;
  }

  handleClick() {
    alert('Lit is working correctly!');
  }
}

// Register the custom element
customElements.define('test-component', TestComponent);
