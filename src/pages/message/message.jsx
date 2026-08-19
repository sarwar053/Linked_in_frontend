import { useState } from 'react';



const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Something went wrong. Please try again.');
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-5 py-4 bg-white border-2 rounded-2xl
    outline-none transition-all duration-300 ease-out
    ${focusedField === fieldName || formData[fieldName] 
      ? 'border-emerald-500 shadow-lg shadow-emerald-500/15 ring-4 ring-emerald-500/5' 
      : 'border-gray-200 hover:border-emerald-300'}
    text-gray-800 placeholder-transparent text-base
  `;

  const labelClasses = (fieldName) => `
    absolute left-5 transition-all duration-300 pointer-events-none font-medium
    ${focusedField === fieldName || formData[fieldName]
      ? '-top-2.5 text-xs text-emerald-700 bg-white px-2'
      : 'top-4 text-gray-400'}
  `;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Message Sent!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Thank you for reaching out. We'll get back to you as soon as possible.</p>
          <button 
            onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
            className="px-8 py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-gray-50 flex items-center justify-center p-4 md:p-8">
      
      {/* Decorative background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">Have a question or just want to say hello? We'd love to hear from you.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          {submitError && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            
            <div className="grid md:grid-cols-2 gap-7">
              {/* Name */}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('name')}
                  placeholder="Your Name"
                  required
                />
                <label htmlFor="name" className={labelClasses('name')}>Your Name</label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('email')}
                  placeholder="Email Address"
                  required
                />
                <label htmlFor="email" className={labelClasses('email')}>Email Address</label>
              </div>
            </div>

            {/* Subject */}
            <div className="relative group">
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('subject')}
                placeholder="Subject"
                required
              />
              <label htmlFor="subject" className={labelClasses('subject')}>Subject</label>
            </div>

            {/* Message */}
            <div className="relative group">
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className={`${inputClasses('message')} resize-none`}
                placeholder="Your Message"
                required
              />
              <label htmlFor="message" className={labelClasses('message')}>Your Message</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300
                flex items-center justify-center space-x-2
                ${isSubmitting 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0'}
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          We typically respond within 24 hours
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;