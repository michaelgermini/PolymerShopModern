// Test ultra-simple - JavaScript vanilla uniquement
console.log('✅ Test JavaScript file loaded successfully!');
console.log('Current timestamp:', new Date().toISOString());

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM Content Loaded event fired');

  const app = document.getElementById('app');
  console.log('App container found:', !!app);

  if (app) {
    app.innerHTML = `
      <div style="padding: 20px; background: #e8f5e8; border: 2px solid #4caf50; border-radius: 8px; margin: 20px;">
        <h1 style="color: #2e7d32; margin: 0 0 10px 0;">🎉 JavaScript is Working!</h1>
        <p style="color: #388e3c; margin: 0 0 10px 0;">This is a simple vanilla JavaScript test.</p>
        <p style="color: #666; margin: 0; font-size: 14px;">Timestamp: ${new Date().toLocaleString()}</p>
        <button onclick="alert('Vanilla JS works! ✅')" style="margin-top: 10px; padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">Test Button</button>
      </div>
    `;
    console.log('✅ DOM manipulation successful');
  } else {
    console.error('❌ App container not found');
    document.body.innerHTML += '<h1 style="color: red;">App container not found!</h1>';
  }
});

// Test window load event as fallback
window.addEventListener('load', () => {
  console.log('✅ Window load event fired');
});
