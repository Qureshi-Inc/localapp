/**
 * Contact Us Page Component
 * Provides the structure and content for the Contact Us page.
 */
export function ContactUs() {
  return `
    <section id="contact">
      <div class="contact-container">
        <h2 class="contact-title">Get In Touch</h2>
        <form class="contact-form" action="#" method="POST">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required aria-required="true">
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required aria-required="true">
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required aria-required="true">
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" placeholder="Your message here..." required aria-required="true"></textarea>
          </div>
          
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>
    </section>
  `;
}

export default ContactUs;