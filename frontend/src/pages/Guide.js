    import React, { useState } from 'react';
import { 
  FaLeaf, 
  FaHome, 
  FaMapMarkedAlt, 
  FaBuilding, 
  FaTree, 
  FaStore,
  FaBook,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaClipboardList,
  FaChartLine,
  FaShieldAlt,
  FaFileAlt,
  FaUsers,
  FaLightbulb
} from 'react-icons/fa';

const Guide = () => {
  const [activeSection, setActiveSection] = useState('agricultural');

  const sections = [
    { id: 'agricultural', name: 'Agricultural Land', icon: FaLeaf },
    { id: 'independent', name: 'Independent House', icon: FaHome },
    { id: 'plot', name: 'Open Plot', icon: FaMapMarkedAlt },
    { id: 'apartment', name: 'Apartment', icon: FaBuilding },
    { id: 'farmhouse', name: 'Farmhouse', icon: FaTree },
    { id: 'commercial', name: 'Commercial', icon: FaStore }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaLeaf className="text-4xl text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">TANAVI GUIDE</h1>
          </div>
          <p className="text-xl text-gray-600">Professional • Structured • Easy for Any User to Understand</p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition border-2 ${
                  activeSection === section.id
                    ? 'bg-primary text-white shadow-lg border-primary'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300 hover:border-primary'
                }`}
              >
                <Icon className="text-xl" />
                {section.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeSection === 'agricultural' && <AgriculturalLandGuide />}
          {activeSection === 'independent' && <IndependentHouseGuide />}
          {activeSection === 'plot' && <OpenPlotGuide />}
          {activeSection === 'apartment' && <ApartmentGuide />}
          {activeSection === 'farmhouse' && <FarmhouseGuide />}
          {activeSection === 'commercial' && <CommercialGuide />}
        </div>
      </div>
    </div>
  );
};

// Agricultural Land Guide Component
const AgriculturalLandGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaLeaf className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">USER GUIDE — AGRICULTURAL LAND</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Agricultural land is one of the most traditional, secure, and long-term forms of real estate investment. 
        Unlike residential plots or commercial properties, agricultural land involves specific legal classifications, 
        zoning regulations, permitted usage rules, and future development considerations.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Buying or selling agricultural land without proper understanding may lead to legal or financial risks. 
        Therefore, Tanavi Properties has created this complete guide to help users make safe, informed, and confident decisions.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is Agricultural Land?</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Agricultural land refers to land legally designated for farming and allied agricultural activities under 
        government revenue and planning regulations.
      </p>
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Primary Uses</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Crop cultivation</li>
          <li>Horticulture & plantations</li>
          <li>Dairy and livestock farming</li>
          <li>Organic agriculture</li>
          <li>Agro-based activities</li>
          <li>Farmhouses (subject to approvals)</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Agricultural Land</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Wet Land (Irrigated Land)</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Continuous water availability</li>
            <li>• Suitable for paddy, vegetables, sugarcane</li>
            <li>• High productivity & resale value</li>
            <li>• Ideal for: Active farming investors</li>
          </ul>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-yellow-500" />
            <h4 className="font-semibold text-lg mb-0">Dry Land (Rain-fed Land)</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Depends on rainfall</li>
            <li>• Lower purchase cost</li>
            <li>• Suitable for cotton, millets, pulses</li>
            <li>• Ideal for: Long-term investment</li>
          </ul>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Garden / Horticulture Land</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Fruit and plantation crops</li>
            <li>• Mango, Coconut, Flowers, Palm</li>
            <li>• Recurring agricultural income</li>
          </ul>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Livestock & Agro-Allied Land</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Dairy farms</li>
            <li>• Poultry units</li>
            <li>• Fisheries</li>
            <li>• Goat & sheep farming</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Land Zoning Explained</h3>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-3">
          <FaLeaf className="text-green-600" />
          <h4 className="font-semibold text-lg mb-0">Agricultural Zone (AG Zone)</h4>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Farming permitted</li>
          <li>Limited construction allowed</li>
          <li>Layout development not allowed without conversion</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Zone</th>
              <th className="px-4 py-2 border text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border">R1 Zone</td><td className="px-4 py-2 border">Urban areas near growth corridors (low density)</td></tr>
            <tr><td className="px-4 py-2 border">R2 Zone</td><td className="px-4 py-2 border">Urban nodes & expanding residential areas</td></tr>
            <tr><td className="px-4 py-2 border">R3 Zone</td><td className="px-4 py-2 border">Urban centers with higher development</td></tr>
            <tr><td className="px-4 py-2 border">R4 Zone</td><td className="px-4 py-2 border">Rural settlements & village expansion areas</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Buyer Decision Flow</h3>
      </div>
      <div className="space-y-4">
        {[
          { step: 'STEP 1', title: 'Define Buyer Objective', desc: 'Purpose decides location — not price alone' },
          { step: 'STEP 2', title: 'Location Evaluation', desc: 'Check distance, connectivity, markets, infrastructure' },
          { step: 'STEP 3', title: 'Legal Verification', desc: 'Ownership, EC, Survey, Road access, Zoning' },
          { step: 'STEP 4', title: 'Land Quality Assessment', desc: 'Soil, water, electricity, terrain risks' },
          { step: 'STEP 5', title: 'Future Potential Analysis', desc: 'Development trends, roads, conversion chances' },
          { step: 'STEP 6', title: 'Investment Decision', desc: 'Make informed choice based on all factors' }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="bg-primary text-white px-4 py-2 rounded-lg font-semibold whitespace-nowrap">{item.step}</div>
            <div>
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Who Can Buy Agricultural Land?</h3>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <p className="text-gray-700 mb-3">Rules vary by state:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Farmers — generally permitted</li>
          <li>Non-agriculturists — may require permission</li>
          <li>Companies — approval required</li>
          <li>NRIs — restrictions may apply</li>
        </ul>
        <p className="text-gray-700 mt-4 font-semibold">Always verify eligibility before purchase.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Buyer Checklist</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Clear title</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> EC verification</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Zoning confirmation</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Road access</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Physical</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Soil quality</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Water source</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Boundary clarity</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Flood risk</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Investment</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Growth indicators</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Infrastructure projects</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Development trends</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="bg-green-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Agricultural land is not just farmland — it is a strategic long-term asset when selected with proper knowledge, 
        verification, and planning. Tanavi Properties aims to provide transparency, education, risk awareness, and 
        professional guidance so every user can make safe and confident agricultural land decisions.
      </p>
    </section>
  </div>
);

// Independent House Guide Component
const IndependentHouseGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaHome className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — INDEPENDENT HOUSE & VILLA</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        An Independent House or Villa represents one of the most secure and prestigious forms of real estate ownership. 
        Unlike apartments, buyers own both the land and the constructed building, making it a powerful long-term asset 
        for living, investment, and generational wealth creation.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is an Independent House / Villa?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        An Independent House is a standalone residential property built on an individually owned plot with exclusive ownership rights.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Ownership Includes:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Land ownership</li>
          <li>Building ownership</li>
          <li>Modification rights</li>
          <li>Redevelopment rights</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Independent Houses & Villas</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Fully Independent House</h4>
          </div>
          <p className="text-gray-700">Individual plot, separate compound wall, no shared structures. Ideal for families & long-term living.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Gated Community Villa</h4>
          </div>
          <p className="text-gray-700">Independent structure inside planned layout with security & amenities. Ideal for premium lifestyle buyers.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Duplex House</h4>
          </div>
          <p className="text-gray-700">Two floors connected internally. Single-family residence.</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Rental Portion House</h4>
          </div>
          <p className="text-gray-700">Multiple portions designed for rental income. Ideal for investors seeking monthly returns.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Buyer Decision Flow</h3>
      </div>
      <div className="space-y-3">
        {[
          'Define Buyer Objective',
          'Location Evaluation',
          'Legal Verification (Mandatory)',
          'Building Approval & Compliance',
          'Physical & Structural Inspection',
          'Market Value Analysis',
          'Tanavi Risk Rating Review',
          'Schedule Visit',
          'Negotiation & Documentation',
          'Registration & Ownership Transfer'
        ].map((step, idx) => (
          <div key={idx} className="flex gap-3 items-center">
            <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">{idx + 1}</div>
            <p className="text-gray-700 font-medium">{step}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Independent House vs Apartment</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Factor</th>
              <th className="px-4 py-2 border text-left">Independent House</th>
              <th className="px-4 py-2 border text-left">Apartment</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border">Land Ownership</td><td className="px-4 py-2 border">Full</td><td className="px-4 py-2 border">Shared</td></tr>
            <tr><td className="px-4 py-2 border">Privacy</td><td className="px-4 py-2 border">High</td><td className="px-4 py-2 border">Medium</td></tr>
            <tr><td className="px-4 py-2 border">Appreciation</td><td className="px-4 py-2 border">High</td><td className="px-4 py-2 border">Moderate</td></tr>
            <tr><td className="px-4 py-2 border">Customization</td><td className="px-4 py-2 border">Full freedom</td><td className="px-4 py-2 border">Limited</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="bg-blue-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-blue-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Independent Houses and Villas provide strong ownership security, lifestyle freedom, and long-term investment growth 
        when purchased with proper verification and planning. Through structured guidance, verified processes, and transparent 
        insights, Tanavi Properties enables safe and confident real estate decisions for every user.
      </p>
    </section>
  </div>
);

// Open Plot Guide Component
const OpenPlotGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaMapMarkedAlt className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — OPEN PLOT (LAND INVESTMENT)</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        An Open Plot represents pure land ownership without construction and is one of the most flexible real estate investments. 
        Since land is a limited resource, its value increases primarily through urban expansion, infrastructure development, and location growth.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is an Open Plot?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        An Open Plot is a legally defined parcel of land designated for residential, commercial, or mixed-use development without existing construction.
      </p>
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Why Open Plots Are Popular</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Low maintenance</li>
          <li>Strong long-term appreciation</li>
          <li>Flexible usage options</li>
          <li>Lower entry investment</li>
          <li>Ideal for land banking</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Layout Approvals — Legal Foundation</h3>
      </div>
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">DTCP Layout Approval</h4>
          <p className="text-gray-700 mb-3">DTCP (Directorate of Town & Country Planning) regulates development in non-metro and developing regions.</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Approved road network</li>
            <li>Plot demarcation</li>
            <li>Drainage planning</li>
            <li>Master plan compliance</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">HMDA Layout Approval</h4>
          <p className="text-gray-700 mb-3">HMDA (Hyderabad Metropolitan Development Authority) governs metropolitan development zones.</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Wide roads & infrastructure</li>
            <li>Parks & open spaces</li>
            <li>Environmental compliance</li>
            <li>High legal credibility</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA — Buyer Protection System</h3>
      </div>
      <p className="text-gray-700 mb-4">
        RERA (Real Estate Regulatory Authority) ensures transparency and accountability in real estate projects.
      </p>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">RERA Ensures:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Transparency in project details</li>
          <li>Legal accountability</li>
          <li>Buyer protection</li>
          <li>Standard practices</li>
          <li>No false advertising</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Factors Affecting Plot Value</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          'Location growth direction',
          'Road width',
          'Approval status',
          'Corner positioning',
          'Infrastructure availability',
          'Demand trends'
        ].map((factor, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded">
            <span className="text-primary font-bold">✓</span>
            <span className="text-gray-700">{factor}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-green-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Open plots offer flexibility, long-term appreciation, and strategic wealth creation when chosen with proper verification 
        and planning. Through structured guidance, verified listings, regulatory awareness, and transparent processes, 
        Tanavi Properties enables safe and confident land investment decisions for every buyer and seller.
      </p>
    </section>
  </div>
);

// Apartment Guide Component
const ApartmentGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaBuilding className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — APARTMENT / FLAT</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        An Apartment (Flat) is one of the most preferred urban real estate assets, combining home ownership, shared infrastructure, 
        security, and lifestyle amenities within a planned residential building.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is an Apartment / Flat?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        An Apartment (Flat) is a residential unit inside a multi-storey building where individual owners own their unit 
        and common areas are shared among residents.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Understanding UDS (Undivided Share of Land)</h4>
        <p className="text-gray-700">
          UDS represents your proportional ownership in the land on which the building stands. 
          Higher UDS = Better long-term asset value. Even if the building redevelops in future, land ownership remains valuable.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Apartments</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { type: 'Builder Apartment', desc: 'Constructed and sold by a real estate developer' },
          { type: 'Gated Community', desc: 'Large projects with amenities and security' },
          { type: 'Luxury Apartment', desc: 'Premium location, high-end specifications' },
          { type: 'Ready-to-Move', desc: 'Construction completed; immediate possession' },
          { type: 'Under-Construction', desc: 'Purchased during construction phase' }
        ].map((item, idx) => (
          <div key={idx} className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold text-lg">{item.type}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA — Mandatory Protection</h3>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <p className="text-gray-700 mb-4">
          RERA (Real Estate Regulatory Authority) protects buyers by regulating real estate developers and projects 
          under the Real Estate (Regulation and Development) Act, 2016.
        </p>
        <h4 className="font-semibold mb-3">Buyer Protection Under RERA:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Protection from project delays</li>
          <li>No misleading advertisements</li>
          <li>Compensation rights</li>
          <li>Complaint resolution mechanism</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Ready-to-Move vs Under-Construction</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Factor</th>
              <th className="px-4 py-2 border text-left">Ready</th>
              <th className="px-4 py-2 border text-left">Under Construction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border">Possession</td><td className="px-4 py-2 border">Immediate</td><td className="px-4 py-2 border">Future</td></tr>
            <tr><td className="px-4 py-2 border">Risk</td><td className="px-4 py-2 border">Low</td><td className="px-4 py-2 border">Moderate</td></tr>
            <tr><td className="px-4 py-2 border">Price</td><td className="px-4 py-2 border">Higher</td><td className="px-4 py-2 border">Lower</td></tr>
            <tr><td className="px-4 py-2 border">Rental Income</td><td className="px-4 py-2 border">Immediate</td><td className="px-4 py-2 border">Delayed</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="bg-blue-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-blue-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Apartments provide immediate living comfort, rental opportunities, and structured urban investment when chosen with 
        proper verification and planning. Through verified listings, RERA transparency, structured decision systems, and 
        end-to-end guidance, Tanavi Properties enables confident apartment ownership for every buyer and seller.
      </p>
    </section>
  </div>
);

// Farmhouse Guide Component
const FarmhouseGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaTree className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — FARMHOUSE PROPERTY</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        A Farmhouse is a unique real estate asset that combines land ownership with residential usage in natural or semi-rural 
        environments. It is commonly used for weekend living, lifestyle investment, agriculture-based living, or long-term land appreciation.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is a Farmhouse?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        A Farmhouse is a residential structure built on agricultural or converted land, usually located outside dense urban areas.
      </p>
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Why Farmhouses Are Popular</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Nature-oriented lifestyle</li>
          <li>Weekend retreat option</li>
          <li>Privacy & space</li>
          <li>Long-term land appreciation</li>
          <li>Alternative investment asset</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Farmhouse Properties</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Farmhouse</h4>
          </div>
          <p className="text-gray-700">Built within agricultural land primarily used for farming. Best for agriculture investors and nature living buyers.</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Lifestyle Farmhouse</h4>
          </div>
          <p className="text-gray-700">Designed mainly for leisure and weekend stays. Best for urban professionals and second-home buyers.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Gated Farmhouse Community</h4>
          </div>
          <p className="text-gray-700">Planned farmhouse layouts with internal infrastructure. Best for secure lifestyle investment.</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Luxury Farmhouse Estate</h4>
          </div>
          <p className="text-gray-700">Large land parcels with premium construction. Best for high-net-worth investors.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Land Classification & Zoning</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-green-600" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Zone</h4>
          </div>
          <p className="text-gray-700">Farming permitted, residential construction restricted or limited, requires permissions.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaHome className="text-blue-600" />
            <h4 className="font-semibold text-lg mb-0">Converted Residential Zone (NA Conversion)</h4>
          </div>
          <p className="text-gray-700">Agricultural land legally converted to residential use. Allows house construction, easier financing, higher resale value.</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaTree className="text-green-700" />
            <h4 className="font-semibold text-lg mb-0">Green Belt / Conservation Zone</h4>
          </div>
          <p className="text-gray-700">Strict development controls. Construction often limited or prohibited.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Approvals & Permissions Required</h3>
      </div>
      <div className="bg-red-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Farmhouse buyers must verify:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Land title ownership</li>
          <li>Land conversion status (if residential usage)</li>
          <li>Building permission approval</li>
          <li>Local panchayat/municipal permissions</li>
          <li>Access road legality</li>
          <li>Electricity & water permissions</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA Applicability</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">When RERA Applies</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Farmhouse plots sold as commercial project</li>
            <li>Developer markets multiple units together</li>
            <li>Project exceeds defined land area limits</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">When RERA May NOT Apply</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Individual farmhouse resale</li>
            <li>Independent agricultural land sale</li>
            <li>Private owner-to-owner transactions</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="bg-green-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Farmhouses offer a unique combination of lifestyle enjoyment and long-term land appreciation when selected with proper 
        legal understanding and planning. Through structured guidance, regulatory awareness, verified listings, and transparent 
        processes, Tanavi Properties enables safe and informed farmhouse investments for every buyer and seller.
      </p>
    </section>
  </div>
);

// Commercial Guide Component
const CommercialGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaStore className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — OFFICE / COMMERCIAL SPACE & COMMERCIAL OPEN LAND</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Commercial real estate refers to properties used for business, trade, professional services, or income-generating activities. 
        Unlike residential property, commercial assets are primarily evaluated based on business usability, rental income potential, 
        location economics, legal compliance, and long-term return on investment.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is Commercial Property?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        Commercial property is real estate legally approved for business or income-generating activities.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">It includes:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {['Office spaces', 'Retail shops', 'Showrooms', 'Commercial buildings', 'Co-working spaces', 'Warehouses', 'Commercial open land'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="text-primary" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Commercial Properties</h3>
      </div>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Office Space</h4>
          </div>
          <p className="text-gray-700">Used for professional and corporate activities. Examples: IT offices, consulting firms, corporate headquarters, startup offices.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Retail / Shop Space</h4>
          </div>
          <p className="text-gray-700">Business-facing locations. Examples: Shops, boutiques, restaurants, clinics.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Commercial Building Floors</h4>
          </div>
          <p className="text-gray-700">Entire floors or buildings used commercially. Ideal for enterprises, institutions, co-working operators.</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Commercial Open Land</h4>
          </div>
          <p className="text-gray-700">Vacant land approved for commercial activity. Used for showrooms, fuel stations, storage yards, event spaces.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Commercial Zoning & Land Use</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-blue-600" />
            <h4 className="font-semibold mb-0">Commercial Zone</h4>
          </div>
          <p className="text-gray-700">Shops & offices allowed, business construction permitted</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-orange-600" />
            <h4 className="font-semibold mb-0">Mixed-Use Zone</h4>
          </div>
          <p className="text-gray-700">Residential + commercial allowed</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-gray-600" />
            <h4 className="font-semibold mb-0">Industrial Zone</h4>
          </div>
          <p className="text-gray-700">Manufacturing & warehouses permitted</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-red-600" />
            <h4 className="font-semibold mb-0">Agricultural Zone</h4>
          </div>
          <p className="text-gray-700">Commercial use NOT allowed without conversion</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Sale vs Lease vs Rent</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Type</th>
              <th className="px-4 py-2 border text-left">Meaning</th>
              <th className="px-4 py-2 border text-left">Suitable For</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border">Sale</td><td className="px-4 py-2 border">Full ownership transfer</td><td className="px-4 py-2 border">Investors</td></tr>
            <tr><td className="px-4 py-2 border">Lease</td><td className="px-4 py-2 border">Long-term contractual usage (3-15 years)</td><td className="px-4 py-2 border">Businesses</td></tr>
            <tr><td className="px-4 py-2 border">Rent</td><td className="px-4 py-2 border">Short-term occupancy</td><td className="px-4 py-2 border">Startups & SMEs</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA Applicability</h3>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <p className="text-gray-700 mb-4">
          RERA registration required when commercial project developed by builder, multiple units sold commercially, 
          or project exceeds defined size. Examples: Office towers, commercial malls, business parks.
        </p>
        <h4 className="font-semibold mb-3">RERA Benefits for Commercial Buyers:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Project transparency</li>
          <li>Construction timeline accountability</li>
          <li>Verified approvals</li>
          <li>Legal complaint mechanism</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Factors Affecting Commercial Property Value</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          'Business district location',
          'Footfall',
          'Parking availability',
          'Brand presence nearby',
          'Road visibility',
          'Infrastructure growth',
          'Metro/highway connectivity'
        ].map((factor, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded flex items-center gap-2">
            <FaCheckCircle className="text-primary" />
            <span className="text-gray-700">{factor}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-blue-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-blue-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Commercial properties and commercial open land offer powerful opportunities for business growth, stable income generation, 
        and long-term investment returns when selected with proper legal and market understanding. Through structured guidance, 
        verified listings, regulatory awareness, and transparent processes, Tanavi Properties enables safe and confident commercial 
        real estate transactions for buyers, sellers, landlords, and tenants.
      </p>
    </section>
  </div>
);

export default Guide;
