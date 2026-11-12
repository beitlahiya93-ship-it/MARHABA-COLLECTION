import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState(
    recentOrders.length > 0 ? recentOrders[0].id : 'ME-529104'
  );

  const activeOrder: Order | null =
    recentOrders.find((o) => o.id.toLowerCase() === searchQuery.toLowerCase()) || {
      id: searchQuery || 'ME-529104',
      createdAt: '2026-11-09T14:20:00Z',
      items: [],
      shippingAddress: {
        fullName: 'Arundhati Sen',
        phone: '9876543210',
        pincode: '700001',
        addressLine: 'Salt Lake Sector 1',
        city: 'Kolkata',
        state: 'West Bengal'
      },
      paymentMethod: 'cod',
      pricing: {
        itemsTotal: 3499,
        discount: 0,
        couponDiscount: 350,
        deliveryFee: 0,
        finalTotal: 3149
      },
      status: 'dispatched',
      trackingNumber: 'BLUEDART-849102834',
      estimatedDeliveryDate: 'Thu, Nov 12'
    };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl border border-[#EFEAE2] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFEAE2] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#6B1426]" />
            <h2 className="font-editorial text-lg font-semibold text-[#111C2D]">
              Direct Loom Order Tracking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#554243] hover:text-[#111C2D] rounded-full hover:bg-black/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 bg-[#FAF8F5] border-b border-[#EFEAE2]">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#887173] absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. ME-529104) or Mobile Number"
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#E2DCD5] rounded focus:border-[#6B1426] focus:outline-none"
            />
          </div>
        </div>

        {/* Order Details Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#FAF8F5] rounded border border-[#EFEAE2]">
            <div>
              <div className="text-xs text-[#887173]">Order Reference</div>
              <div className="font-bold text-[#111C2D] text-sm">{activeOrder.id}</div>
              <div className="text-[11px] text-[#554243]">
                Courier: <strong>BlueDart Express</strong> ({activeOrder.trackingNumber})
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-xs text-[#887173]">Estimated Delivery</div>
              <div className="text-sm font-extrabold text-emerald-800">
                {activeOrder.estimatedDeliveryDate}
              </div>
              <div className="text-[11px] text-[#775A00] font-medium">
                Payment: {activeOrder.paymentMethod.toUpperCase()} (₹{activeOrder.pricing.finalTotal.toLocaleString('en-IN')})
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-bold text-[#111C2D] uppercase tracking-wider">
              Loom-to-Doorstep Progress
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2DCD5]">
              {/* Step 1 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111C2D]">Order Received & Guild Assigned</div>
                  <div className="text-[11px] text-[#554243]">Order routed directly to Varanasi Master Weavers cluster.</div>
                  <div className="text-[10px] text-[#887173] mt-0.5">Yesterday, 14:20 IST</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111C2D]">Silk Mark Authenticity Verification</div>
                  <div className="text-[11px] text-[#554243]">Handloom fabric inspected for purity, zari density & fold integrity.</div>
                  <div className="text-[10px] text-[#887173] mt-0.5">Yesterday, 18:45 IST</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111C2D]">Dispatched via Air Express</div>
                  <div className="text-[11px] text-[#554243]">Package picked up by BlueDart Hub in Varanasi. In transit to destination city.</div>
                  <div className="text-[10px] text-[#887173] mt-0.5">Today, 09:30 IST</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#FECE57] text-[#4B0013] text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                  4
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111C2D]">Out for Delivery</div>
                  <div className="text-[11px] text-[#554243]">Expected delivery to {activeOrder.shippingAddress.city} by {activeOrder.estimatedDeliveryDate}.</div>
                  <div className="text-[10px] text-[#C59B27] font-semibold mt-0.5">Scheduled Next</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Open Box Inspection Guarantee:</strong> You are welcome to inspect the weave and texture before completing your Cash on Delivery payment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
