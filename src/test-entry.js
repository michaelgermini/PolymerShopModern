/**
 * Ultra simple test - just create a basic HTML element
 */
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    // Clear any existing content
    appContainer.innerHTML = '';

    // Create a simple div
    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
      padding: 20px;
      background: #e8f5e8;
      border: 2px solid #4caf50;
      margin: 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
    `;

    testDiv.innerHTML = `
      <h1 style="color: #2e7d32; margin: 0 0 10px 0;">🎉 JavaScript is Working!</h1>
      <p style="color: #388e3c; margin: 0 0 15px 0;">If you can see this, basic JavaScript is functioning.</p>
      <button style="background: #4caf50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;" onclick="alert('Basic JavaScript works! ✅')">Test Button</button>
      <p style="margin-top: 20px; color: #666; font-size: 14px;">Timestamp: ${new Date().toISOString()}</p>
    `;

    appContainer.appendChild(testDiv);
    console.log('Basic JavaScript test loaded successfully!');
  } else {
    console.error('App container not found!');
  }
});
