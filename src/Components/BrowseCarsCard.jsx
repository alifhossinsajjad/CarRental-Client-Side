import React, { useState,  use } from 'react';

import { FaCar, FaUser, FaMapMarkerAlt, FaGasPump, FaCog, FaUsers, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';


const BrowseCarsCard = ({ car }) => {
  const { user } = use(AuthContext)
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    totalPrice: 0
  });

  const { 
    _id,
    carName: name, 
    rentPricePerDay: rentPrice, 
    carModel: model,
    providerName,
    carCategory: category,
    status,
    image,
    // created_at: createdAt,
    // created_by: createdBy
  } = car;

  const description = `${name} ${model} - A reliable and comfortable vehicle for your travel needs.`;
  const location = "Dhaka, Bangladesh"; 
  const features = ["Air Conditioning", "Bluetooth", "GPS Navigation"];
  const seats = category === 'SUV' ? 5 : 4;
  const transmission = "Automatic";
  const fuelType = category === 'Electric' ? 'Electric' : 'Petrol';

 

  const handleViewDetails = () => {
    navigate(`/car/${_id}`);
  };

  const calculateTotalPrice = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return days > 0 ? days * rentPrice : 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to book a car');
      return;
    }

    const bookingPayload = {
      carId: _id,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || 'User',
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      totalPrice: bookingData.totalPrice
    };

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();

      if (result.success) {
        alert('Car booked successfully!');
        setShowBookingModal(false);
     
        window.location.reload();
      } else {
        alert(result.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
        {/* Image Section with Status Badge */}
        <figure className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Status Badge */}
          <div className={`absolute top-3 right-3 badge badge-lg ${
            status === 'Available' 
              ? 'badge-success text-white' 
              : 'badge-error text-white'
          }`}>
            {status}
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="badge badge-primary badge-outline text-white bg-black/50 backdrop-blur-sm">
              {category}
            </span>
          </div>
        </figure>

        {/* Card Body */}
        <div className="card-body p-5">
          {/* Car Name and Price */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="card-title text-xl font-bold text-gray-800 line-clamp-1 flex-1 mr-2">
              {name}
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${rentPrice}</div>
              <div className="text-sm text-gray-500">per day</div>
            </div>
          </div>

          {/* Model and Year */}
          <div className="flex items-center gap-2 mb-2">
            <FaCar className="text-primary text-sm" />
            <span className="text-sm text-gray-600 font-medium">{model} Model</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 line-clamp-2 mb-4 text-sm">
            {description}
          </p>

          {/* Car Specifications */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaUsers className="text-primary" />
              <span>{seats} Seats</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCog className="text-primary" />
              <span>{transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaGasPump className="text-primary" />
              <span>{fuelType}</span>
            </div>
          </div>

          {/* Features Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="badge badge-outline badge-sm text-gray-600"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Location and Provider */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="line-clamp-1">{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-blue-500" />
              <span className="line-clamp-1">{providerName}</span>
            </div>
          </div>

          {/* Rating (Static for now) */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="fill-current" size={14} />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.8)</span>
          </div>

          {/* Action Buttons */}
          <div className="card-actions">
            <button 
              className="btn btn-outline btn-primary"
              onClick={handleViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Book {name}</h3>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Start Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={bookingData.startDate}
                  onChange={(e) => {
                    const newStartDate = e.target.value;
                    setBookingData({
                      ...bookingData,
                      startDate: newStartDate,
                      totalPrice: calculateTotalPrice(newStartDate, bookingData.endDate)
                    });
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={bookingData.endDate}
                  onChange={(e) => {
                    const newEndDate = e.target.value;
                    setBookingData({
                      ...bookingData,
                      endDate: newEndDate,
                      totalPrice: calculateTotalPrice(bookingData.startDate, newEndDate)
                    });
                  }}
                  min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {bookingData.totalPrice > 0 && (
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${bookingData.totalPrice}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))} days × ${rentPrice}/day
                  </div>
                </div>
              )}

              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!bookingData.startDate || !bookingData.endDate || bookingData.totalPrice <= 0}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseCarsCard;