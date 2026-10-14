import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, MapPin, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    topic: 'Editorial Feedback',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate responsive submission feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const faqs = [
    {
      q: 'Can I reference these articles in my own academic assignments?',
      a: 'Absolutely! All 10 articles are prepared for educational reference. You are welcome to cite "The Digital Lifestyle" as an academic resource with proper attribution.'
    },
    {
      q: 'How frequently is the digital journal updated?',
      a: 'The publication operates on a curated academic cycle, with topical reviews covering emerging shifts in artificial intelligence, digital business, and media marketing.'
    },
    {
      q: 'Can students submit guest viewpoints or research digests?',
      a: 'Yes, we welcome student contributions and case studies on technology and digital commerce. Use the contact form below with the subject "Guest Research Pitch".'
    },
    {
      q: 'Where are the editorial headquarters located?',
      a: 'Our research desk collaborates across Mumbai and Bengaluru, operating digitally with academic mentors nationwide.'
    }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3 border border-blue-200">
          <MessageSquare className="w-3.5 h-3.5" />
          Editorial Desk & Feedback
        </div>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
          Get in Touch with Our <span className="text-blue-600 italic">Editorial Team</span>
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Have an inquiry regarding an article, feedback on our educational curriculum, or an academic collaboration proposal? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Information & Context (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-slate-900 text-white shadow-lg space-y-6">
            <h3 className="font-serif-editorial text-2xl font-bold text-white">
              Editorial Secretariat
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We respond to all academic inquiries, student correspondence, and feedback within 24 to 48 business hours.
            </p>

            <div className="space-y-4 pt-2 border-t border-slate-800 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Direct Inquiries</p>
                  <p className="font-semibold text-slate-200">editorial@thedigitallifestyle.edu</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Research Center</p>
                  <p className="font-semibold text-slate-200">Technology & Media Lab, Innovation Wing, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Working Hours</p>
                  <p className="font-semibold text-slate-200">Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ summary */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Frequently Asked Questions
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-200/80 pb-2.5 last:border-b-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center justify-between gap-2 transition-colors py-1"
                  >
                    <span>{faq.q}</span>
                    {expandedFaq === i ? (
                      <ChevronUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {expandedFaq === i && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed pl-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-slate-950">
                Message Dispatched Successfully!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your correspondence regarding "{formData.subject || formData.topic}" has been logged with the editorial secretariat.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      topic: 'Editorial Feedback',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-slate-100 pb-4 mb-2">
                <h3 className="font-serif-editorial text-2xl font-bold text-slate-900">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below. All required fields are marked (*).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Om Pingale"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                  >
                    <option value="Editorial Feedback">Editorial Feedback</option>
                    <option value="College Project Query">College Project Query</option>
                    <option value="Article Correction">Article Correction / Update</option>
                    <option value="Guest Academic Pitch">Guest Academic Pitch</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI in Everyday Life Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share your thoughts, questions, or feedback here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-600/30 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 disabled:opacity-70"
              >
                {loading ? (
                  <span>Transmitting Message...</span>
                ) : (
                  <>
                    <span>Submit Correspondence</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
