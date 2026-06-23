import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    failed++;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

// Import modules
import { routes, resolveRoute, getRouteUrl } from '../src/routes/index.js';
import { navigation } from '../src/navigation/index.js';

describe('Routes Configuration', () => {
  test('should export routes array', () => {
    assert.ok(Array.isArray(routes));
  });

  test('should contain Home and Contact Us routes', () => {
    const homeRoute = routes.find(r => r.name === 'Home');
    const contactRoute = routes.find(r => r.name === 'Contact Us');
    assert.ok(homeRoute, 'Home route missing');
    assert.ok(contactRoute, 'Contact Us route missing');
    assert.strictEqual(homeRoute.path, '/');
    assert.strictEqual(contactRoute.path, '/contact');
  });

  test('resolveRoute should return correct route for given path', () => {
    assert.strictEqual(resolveRoute('/'), routes[0]);
    assert.strictEqual(resolveRoute('/contact'), routes[1]);
    assert.strictEqual(resolveRoute('/nonexistent'), null);
  });

  test('getRouteUrl should generate correct URLs', () => {
    assert.strictEqual(getRouteUrl('/'), '/');
    assert.strictEqual(getRouteUrl('/contact'), '/contact');
    assert.strictEqual(getRouteUrl('contact'), '/contact');
  });
});

describe('Navigation Configuration', () => {
  test('should export navigation array', () => {
    assert.ok(Array.isArray(navigation));
  });

  test('should contain all expected navigation items', () => {
    const names = navigation.map(n => n.name);
    assert.ok(names.includes('Home'));
    assert.ok(names.includes('Contact Us'));
    assert.ok(names.includes('Features'));
    assert.ok(names.includes('Demo'));
    assert.ok(names.includes('Benefits'));
    assert.ok(names.includes('Testimonials'));
    assert.ok(names.includes('FAQ'));
  });

  test('Contact Us navigation item should point to correct path', () => {
    const contactNav = navigation.find(n => n.name === 'Contact Us');
    assert.ok(contactNav, 'Contact Us navigation item missing');
    assert.strictEqual(contactNav.path, '/contact.html');
  });
});

describe('Contact Us Page', () => {
  test('should exist at public/contact.html', () => {
    const contactPath = path.resolve(rootDir, 'public/contact.html');
    assert.ok(fs.existsSync(contactPath), 'contact.html does not exist');
  });

  test('should contain required contact form elements', () => {
    const contactPath = path.resolve(rootDir, 'public/contact.html');
    const content = fs.readFileSync(contactPath, 'utf-8');
    
    assert.ok(content.includes('id="name"'), 'Missing name input');
    assert.ok(content.includes('id="email"'), 'Missing email input');
    assert.ok(content.includes('id="subject"'), 'Missing subject input');
    assert.ok(content.includes('id="message"'), 'Missing message textarea');
    assert.ok(content.includes('class="contact-form"'), 'Missing contact form class');
    assert.ok(content.includes('Send Message'), 'Missing submit button');
  });

  test('should follow existing styling conventions', () => {
    const contactPath = path.resolve(rootDir, 'public/contact.html');
    const content = fs.readFileSync(contactPath, 'utf-8');
    
    assert.ok(content.includes('var(--primary)'), 'Missing primary color variable');
    assert.ok(content.includes('var(--secondary)'), 'Missing secondary color variable');
    assert.ok(content.includes('var(--dark)'), 'Missing dark background variable');
    assert.ok(content.includes('var(--card-bg)'), 'Missing card background variable');
  });
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);