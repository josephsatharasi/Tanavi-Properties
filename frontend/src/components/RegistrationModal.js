import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';
import { compressImage } from '../utils/imageCompressor';

const RegistrationModal = ({ isOpen, onClose, modalType = 'register' }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    propertyType: '',
    // Agricultural Land
    acres: '',
    guntas: '',
    // Independent House/Villa
    plotArea: '',
    totalFloors: '',
    portions: '',
    bedrooms: '',
    washrooms: '',
    furnishingStatus: '',
    buildingAge: '',
    parkingType: '',
    numberOfParkings: '',
    // Open Plot
    plotAreaYards: '',
    // Apartment
    flatType: '',
    buildupArea: '',
    floorDetails: '',
    propertyAge: '',
    washroomDetails: '',
    // Farmhouse
    farmhouseArea: '',
    farmhouseGuntas: '',
    swimmingPool: '',
    anyConstruction: '',
    garden: '',
    // Commercial
    commercialPropertyType: '',
    transactionType: '',
    builtupAreaCommercial: '',
    floor: '',
    plugPlay: '',
    workStations: '',
    cabins: '',
    conferenceHall: '',
    pantry: '',
    landArea: '',
    landAreaUnit: '',
    // Common fields
    expectedPrice: '',
    propertyFacing: '',
    roadType: '',
    road: '',
    propertyUnder: '',
    boundaryType: '',
    bore: '',
    anyPTCase: '',
    propertyLocation: '',
    revenueRegistration: '',
    propertyCity: '',
    district: '',
    state: '',
    images: [],
    video: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderPropertyTypeFields = () => {
    switch (formData.propertyType) {
      case 'Agricultural Land':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Acres <span className="text-red-500">*</span></label>
                <input type="number" name="acres" value={formData.acres} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="12" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Guntas</label>
                <input type="number" name="guntas" value={formData.guntas} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="06" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Cr - Lakhs - Thousands" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="BT Road">BT Road</option>
                  <option value="Matti Road">Matti Road</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <input type="text" name="road" value={formData.road} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="60 Feet Road" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Boundary Type</label>
                <select name="boundaryType" value={formData.boundaryType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Compound Wall">Compound Wall</option>
                  <option value="Precast Compound">Precast Compound</option>
                  <option value="Fencing">Fencing</option>
                  <option value="Open">Open</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="number" name="bore" value={formData.bore} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Any PT Case</label>
              <select name="anyPTCase" value={formData.anyPTCase} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Independent House':
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Villa / House Details <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="plotArea" value={formData.plotArea} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Plot Area: 200 Sq Yards" />
                <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Total Floors: 3" />
                <input type="number" name="portions" value={formData.portions} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Portions: 3" />
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Bedrooms: 5" />
                <input type="number" name="washrooms" value={formData.washrooms} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Washrooms: 8" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Furnishing Status</label>
                <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Building Age</label>
                <input type="text" name="buildingAge" value={formData.buildingAge} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="New or Number of Years old" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Parking Details</label>
                <select name="parkingType" value={formData.parkingType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Number of Car Parkings</label>
                <input type="number" name="numberOfParkings" value={formData.numberOfParkings} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Cr - Lakhs - Thousands" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="number" name="bore" value={formData.bore} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway - Commercial">Highway - Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <input type="text" name="road" value={formData.road} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="60 Feet Road" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
              <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                <option value="">Select</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Corner">Corner</option>
              </select>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Open Plot':
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Plot Area <span className="text-red-500">*</span></label>
              <input type="text" name="plotAreaYards" value={formData.plotAreaYards} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="200 Sq Yards" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Cr - Lakhs - Thousands" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="number" name="bore" value={formData.bore} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <input type="text" name="road" value={formData.road} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="60 Feet Road" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
              <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                <option value="">Select</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Corner">Corner</option>
              </select>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Apartment':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Flat Type <span className="text-red-500">*</span></label>
                <input type="text" name="flatType" value={formData.flatType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Triple Bed Room" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Buildup Area <span className="text-red-500">*</span></label>
                <input type="text" name="buildupArea" value={formData.buildupArea} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="1280 SFT" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Cr - Lakhs - Thousands" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Floor Details</label>
                <input type="text" name="floorDetails" value={formData.floorDetails} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2nd Floor" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Age</label>
                <input type="text" name="propertyAge" value={formData.propertyAge} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="New / 6 years" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Furnishing Status</label>
                <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Washroom Details</label>
                <input type="text" name="washroomDetails" value={formData.washroomDetails} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Total-5, Inside-3, Outside-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Parking Details</label>
                <select name="parkingType" value={formData.parkingType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Number of Car Parkings</label>
                <input type="number" name="numberOfParkings" value={formData.numberOfParkings} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <input type="text" name="road" value={formData.road} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="60 Feet Road" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Farmhouse':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Farmhouse Area (Acres) <span className="text-red-500">*</span></label>
                <input type="number" name="farmhouseArea" value={formData.farmhouseArea} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="12" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Guntas</label>
                <input type="number" name="farmhouseGuntas" value={formData.farmhouseGuntas} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="06" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Cr - Lakhs - Thousands" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="BT Road">BT Road</option>
                  <option value="Matti Road">Matti Road</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <input type="text" name="road" value={formData.road} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="60 Feet Road" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Boundary Type</label>
                <select name="boundaryType" value={formData.boundaryType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Compound Wall">Compound Wall</option>
                  <option value="Precast Compound">Precast Compound</option>
                  <option value="Fencing">Fencing</option>
                  <option value="Open">Open</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Any PT Case</label>
                <select name="anyPTCase" value={formData.anyPTCase} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="number" name="bore" value={formData.bore} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Swimming Pool</label>
                <select name="swimmingPool" value={formData.swimmingPool} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Any Construction</label>
                <select name="anyConstruction" value={formData.anyConstruction} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Washroom Details</label>
                <input type="text" name="washroomDetails" value={formData.washroomDetails} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Total-5, Inside-3, Outside-2" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Garden</label>
              <input type="text" name="garden" value={formData.garden} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Yes" />
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Commercial Space':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Commercial Property Type <span className="text-red-500">*</span></label>
                <select name="commercialPropertyType" value={formData.commercialPropertyType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Office / Commercial Space">Office / Commercial Space</option>
                  <option value="Commercial Open Space">Commercial Open Space</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Transaction Type <span className="text-red-500">*</span></label>
                <select name="transactionType" value={formData.transactionType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>
            {formData.commercialPropertyType === 'Office / Commercial Space' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Built-up Area <span className="text-red-500">*</span></label>
                    <input type="text" name="builtupAreaCommercial" value={formData.builtupAreaCommercial} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="5000 Sq. Ft" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Floor</label>
                    <input type="text" name="floor" value={formData.floor} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2nd Floor (of 5 Floors)" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Plug & Play</label>
                    <select name="plugPlay" value={formData.plugPlay} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Work Stations</label>
                    <input type="number" name="workStations" value={formData.workStations} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="25" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Cabins</label>
                    <input type="number" name="cabins" value={formData.cabins} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="8" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Conference Hall</label>
                    <input type="number" name="conferenceHall" value={formData.conferenceHall} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Pantry</label>
                    <input type="number" name="pantry" value={formData.pantry} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="1" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Washroom Details</label>
                  <input type="text" name="washroomDetails" value={formData.washroomDetails} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Total-5, Inside-3, Outside-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Parking Details</label>
                    <select name="parkingType" value={formData.parkingType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Public">Public</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Number of Car Parkings</label>
                    <input type="number" name="numberOfParkings" value={formData.numberOfParkings} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="10" />
                  </div>
                </div>
              </>
            )}
            {formData.commercialPropertyType === 'Commercial Open Space' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Land Area <span className="text-red-500">*</span></label>
                    <input type="text" name="landArea" value={formData.landArea} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="8,000" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Unit</label>
                    <select name="landAreaUnit" value={formData.landAreaUnit} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Sq. Ft">Sq. Ft</option>
                      <option value="Sq. Yards">Sq. Yards</option>
                      <option value="Acres">Acres</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Bore</label>
                    <input type="number" name="bore" value={formData.bore} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="2" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Boundary Type</label>
                    <select name="boundaryType" value={formData.boundaryType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Compound Wall">Compound Wall</option>
                      <option value="Precast Compound">Precast Compound</option>
                      <option value="Fencing">Fencing</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder={formData.transactionType === 'Sale' ? 'Cr - Lakhs - Thousands' : '₹75 per Sq. Ft'} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <input type="text" name="road" value={formData.road} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="60 Feet Road" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>
            {renderLocationFields()}
          </>
        );
      
      default:
        return null;
    }
  };

  const renderLocationFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Property Location <span className="text-red-500">*</span></label>
          <input type="text" name="propertyLocation" value={formData.propertyLocation} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Ranipet" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Revenue Registration / Sub Registrar <span className="text-red-500">*</span></label>
          <input type="text" name="revenueRegistration" value={formData.revenueRegistration} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Midjil" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Property City <span className="text-red-500">*</span></label>
          <input type="text" name="propertyCity" value={formData.propertyCity} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Jadcherla" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">District <span className="text-red-500">*</span></label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Mahabubnagar" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">State <span className="text-red-500">*</span></label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Telangana" />
        </div>
      </div>
    </>
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (formData.images.length >= 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    setUploading(true);
    let uploadFile = file;
    try {
      uploadFile = await compressImage(file, 2);
    } catch (err) {
      console.log('Compression failed, using original:', err);
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', uploadFile);

    try {
      const res = await fetch(`${API_URL}/api/upload/public`, {
        method: 'POST',
        body: formDataUpload
      });
      
      const data = await res.json();
      if (res.ok) {
        setFormData({...formData, images: [...formData.images, data.url]});
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = async function() {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > 30) {
        alert('Video must be 30 seconds or less');
        e.target.value = '';
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert('Video size must be less than 50MB');
        e.target.value = '';
        return;
      }

      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append('video', file);

      try {
        const res = await fetch(`${API_URL}/api/upload/public/video`, {
          method: 'POST',
          body: formDataUpload
        });
        
        const data = await res.json();
        if (res.ok) {
          setFormData({...formData, video: data.url});
        } else {
          alert(`Upload failed: ${data.message}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    };
    video.src = URL.createObjectURL(file);
  };

  const removeImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.userType === 'Agent') {
      alert('Only property owners can submit listings.');
      return;
    }
    
    const submitData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userType: formData.userType,
      propertyType: formData.propertyType,
      title: `${formData.propertyType} in ${formData.propertyLocation}`,
      category: formData.propertyType,
      location: `${formData.propertyLocation}, ${formData.propertyCity}, ${formData.district}, ${formData.state}`,
      price: formData.expectedPrice,
      description: JSON.stringify({
        acres: formData.acres,
        guntas: formData.guntas,
        plotArea: formData.plotArea,
        totalFloors: formData.totalFloors,
        portions: formData.portions,
        bedrooms: formData.bedrooms,
        washrooms: formData.washrooms,
        furnishingStatus: formData.furnishingStatus,
        buildingAge: formData.buildingAge,
        plotAreaYards: formData.plotAreaYards,
        flatType: formData.flatType,
        buildupArea: formData.buildupArea,
        floorDetails: formData.floorDetails,
        propertyAge: formData.propertyAge,
        washroomDetails: formData.washroomDetails,
        farmhouseArea: formData.farmhouseArea,
        farmhouseGuntas: formData.farmhouseGuntas,
        swimmingPool: formData.swimmingPool,
        anyConstruction: formData.anyConstruction,
        garden: formData.garden,
        commercialPropertyType: formData.commercialPropertyType,
        transactionType: formData.transactionType,
        builtupAreaCommercial: formData.builtupAreaCommercial,
        floor: formData.floor,
        plugPlay: formData.plugPlay,
        workStations: formData.workStations,
        cabins: formData.cabins,
        conferenceHall: formData.conferenceHall,
        pantry: formData.pantry,
        landArea: formData.landArea,
        landAreaUnit: formData.landAreaUnit,
        propertyFacing: formData.propertyFacing,
        roadType: formData.roadType,
        road: formData.road,
        propertyUnder: formData.propertyUnder,
        boundaryType: formData.boundaryType,
        bore: formData.bore,
        anyPTCase: formData.anyPTCase,
        revenueRegistration: formData.revenueRegistration
      }),
      images: formData.images,
      video: formData.video
    };

    try {
      const res = await fetch(`${API_URL}/api/properties/user-listing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          userType: '',
          propertyType: '',
          acres: '',
          guntas: '',
          plotArea: '',
          totalFloors: '',
          portions: '',
          bedrooms: '',
          washrooms: '',
          furnishingStatus: '',
          buildingAge: '',
          plotAreaYards: '',
          flatType: '',
          buildupArea: '',
          floorDetails: '',
          propertyAge: '',
          washroomDetails: '',
          farmhouseArea: '',
          farmhouseGuntas: '',
          swimmingPool: '',
          anyConstruction: '',
          garden: '',
          commercialPropertyType: '',
          transactionType: '',
          builtupAreaCommercial: '',
          floor: '',
          plugPlay: '',
          workStations: '',
          cabins: '',
          conferenceHall: '',
          pantry: '',
          landArea: '',
          landAreaUnit: '',
          expectedPrice: '',
          propertyFacing: '',
          roadType: '',
          road: '',
          propertyUnder: '',
          boundaryType: '',
          bore: '',
          anyPTCase: '',
          propertyLocation: '',
          revenueRegistration: '',
          propertyCity: '',
          district: '',
          state: '',
          images: [],
          video: ''
        });
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to submit');
      }
    } catch (error) {
      alert('Failed to submit property');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in">
          <div className="mb-6">
            <FaCheckCircle className="text-green-500 text-7xl mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Registration submitted successfully! We will contact you soon.
          </p>
          <button
            onClick={handleSuccessClose}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-medium text-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Register Your Property</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="Name should only contain letters"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
              title="Email must be a valid Gmail address (e.g., example@gmail.com)"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength="10"
              title="Phone number must be exactly 10 digits"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">You are <span className="text-red-500">*</span></label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
            >
              <option value="">Select</option>
              <option value="Owner">Owner</option>
              <option value="Agent">Agent</option>
            </select>
            {formData.userType === 'Agent' && (
              <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 font-medium">Currently, Tanavi Properties accepts property listings only from direct owners. If you are an agent or broker, please contact Tanavi Properties.</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Property Type <span className="text-red-500">*</span></label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              disabled={formData.userType === 'Agent'}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
            >
              <option value="">Select Property Type</option>
              <option value="Agricultural Land">Agricultural Land</option>
              <option value="Independent House">Independent House</option>
              <option value="Apartment">Apartment</option>
              <option value="Open Plot">Open Plot</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Commercial Space">Commercial Space</option>
            </select>
          </div>

          {/* Dynamic Property Type Fields */}
          {formData.propertyType && formData.userType === 'Owner' && (
            <div className="space-y-4">
              {renderPropertyTypeFields()}
            </div>
          )}

          {modalType === 'list' && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Images (Max 5)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={formData.images.length >= 5 || uploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={getImageUrl(img)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Video (Max 30 seconds)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={uploading || formData.video}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading video...</p>}
                {formData.video && (
                  <div className="mt-3 relative">
                    <video src={getImageUrl(formData.video)} controls className="w-full max-h-40 rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, video: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded px-3 py-1 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 transition font-medium"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
