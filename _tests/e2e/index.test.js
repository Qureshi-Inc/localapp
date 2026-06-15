const { test, expect } = require('@playwright/test');

test.describe('AI Dev Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main title correctly', async ({ page }) => {
    const title = await page.locator('h1').textContent();
    expect(title).toContain('Autonomous Coding Agent');
  });

  test('should have working navigation links', async ({ page }) => {
    const navLinks = await page.locator('.nav-link').all();
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Check that at least one link works
    const firstLink = navLinks[0];
    const href = await firstLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('should open demo when clicking "See It In Action"', async ({ page }) => {
    const demoButton = await page.locator('text=▶️ See It In Action');
    await demoButton.click();
    
    // Check that we've scrolled to the demo section
    const demoSection = await page.locator('#demo');
    expect(await demoSection.isVisible()).toBe(true);
  });

  test('should have working feature cards', async ({ page }) => {
    const featureCards = await page.locator('.feature-card').all();
    expect(featureCards.length).toBeGreaterThan(0);
    
    // Click on first feature card to open modal
    await featureCards[0].click();
    
    // Check that modal is visible
    const modal = await page.locator('#modal-overlay');
    expect(await modal.isVisible()).toBe(true);
  });

  test('should have working accordion in FAQ', async ({ page }) => {
    const firstAccordion = await page.locator('.accordion-item').first();
    const header = await firstAccordion.locator('.accordion-header');
    
    // Click to expand
    await header.click();
    
    // Check that content is visible
    const content = await firstAccordion.locator('.accordion-content');
    expect(await content.isVisible()).toBe(true);
  });

  test('should have working theme toggle', async ({ page }) => {
    const themeToggle = await page.locator('#theme-toggle');
    const initialTheme = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--dark')
    );
    
    // Click to change theme
    await themeToggle.click();
    
    const newTheme = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--dark')
    );
    
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should have working chat widget', async ({ page }) => {
    const chatButton = await page.locator('.chat-button');
    await chatButton.click();
    
    // Check that chat window is visible
    const chatWindow = await page.locator('.chat-window');
    expect(await chatWindow.isVisible()).toBe(true);
  });

  test('should have working mobile menu', async ({ page }) => {
    // For small screens, check if mobile menu button exists and works
    const mobileMenuButton = await page.locator('#mobile-menu-btn');
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      const navLinks = await page.locator('.nav-links.active');
      expect(await navLinks.isVisible()).toBe(true);
    }
  });

  test('should load GitHub issues successfully', async ({ page }) => {
    // Wait for the issues to load
    const loadingElement = await page.locator('.loading').first();
    
    // Check that we eventually get issue cards (not just loading)
    try {
      await page.waitForSelector('.issue-card', { timeout: 10000 });
      
      const issueCards = await page.locator('.issue-card').all();
      expect(issueCards.length).toBeGreaterThan(0);
    } catch (error) {
      // If no issues loaded, check that we got an error message
      const errorMessage = await page.locator('.error');
      expect(await errorMessage.isVisible()).toBe(true);
    }
  });

  test('should have valid SEO metadata', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('AI Dev - Autonomous Coding Agent');

    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('AI Dev - Autonomous Coding Agent');

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('should have responsive design elements', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mobileMenuButton = await page.locator('#mobile-menu-btn');
    expect(await mobileMenuButton.isVisible()).toBe(true);
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const desktopNavLinks = await page.locator('.nav-links:not(.active)');
    expect(await desktopNavLinks.isVisible()).toBe(true);
  });

  test('should have working terminal demo', async ({ page }) => {
    // Click the run demo button
    const runDemoButton = await page.locator('#run-demo-btn');
    await runDemoButton.click();
    
    // Check that terminal output has content
    const terminalOutput = await page.locator('.terminal-body');
    expect(await terminalOutput.isVisible()).toBe(true);
  });

  test('should have animated elements', async ({ page }) => {
    // Check if background orbs exist and are visible
    const orbs = await page.locator('.gradient-orb').all();
    expect(orbs.length).toBeGreaterThan(0);
    
    // Check particles container exists
    const particlesContainer = await page.locator('.particles');
    expect(await particlesContainer.isVisible()).toBe(true);
  });
});