import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What types of properties does Tanavi Properties offer?",
      answer: "Tanavi Properties specializes in premium villas, luxury apartments, and commercial spaces across prime locations in Hyderabad including Jubilee Hills, Gachibowli, Banjara Hills, Hitech City, and more."
    },
    {
      question: "Are all projects RERA registered?",
      answer: "Yes, all our projects are RERA registered and comply with all regulatory requirements. You can verify the RERA registration numbers on our property listings and the official RERA website."
    },
    {
      question: "What is the typical timeline for project delivery?",
      answer: "We have a proven track record of timely delivery. Typically, our projects are completed within 24-36 months from the launch date. We provide regular updates and maintain transparency throughout the construction process."
    },
    {
      question: "Do you offer home loan assistance?",
      answer: "Yes, we have tie-ups with leading banks and financial institutions to help you secure home loans at competitive interest rates. Our team will guide you through the entire loan application process."
    },
    {
      question: "What amenities are included in your projects?",
      answer: "Our projects feature world-class amenities including swimming pools, gyms, clubhouses, children's play areas, landscaped gardens, 24/7 security, power backup, and more. Specific amenities vary by project."
    },
    {
      question: "Can I schedule a site visit?",
      answer: "Absolutely! We encourage site visits to help you make an informed decision. You can schedule a visit by contacting us through our website, phone, or by visiting our office. Our team will arrange a guided tour at your convenience."
    },
    {
      question: "What is the payment structure?",
      answer: "We offer flexible payment plans tailored to your needs. Typically, payments are linked to construction milestones. Our sales team will provide detailed payment schedules and discuss customized options."
    },
    {
      question: "Do you provide after-sales support?",
      answer: "Yes, we provide comprehensive after-sales support including warranty coverage, maintenance assistance, and a dedicated customer service team to address any concerns even after possession."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span className="text-2xl text-primary">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
