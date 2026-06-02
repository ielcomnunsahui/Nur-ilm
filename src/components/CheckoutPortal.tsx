/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CreditCard, Check, Sparkles, X, ShieldCheck, Landmark, Globe, Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { speakText } from './AudioVoiceHelper';

interface CheckoutPortalProps {
  onSuccessPay: () => void;
  onClose: () => void;
}

export const CheckoutPortal: React.FC<CheckoutPortalProps> = ({
  onSuccessPay,
  onClose
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [payGateway, setPayGateway] = useState<'paystack' | 'flutterwave'>('paystack');
  const [isPaying, setIsPaying] = useState(false);
  const [step, setStep] = useState<'plans' | 'pay_method'>('plans');

  // Input mock parameters
  const [cardNumber, setCardNumber] = useState("");
  const [phone, setPhone] = useState("");

  const getPrice = () => {
    if (selectedPlan === 'monthly') return { ngn: 1500, usd: 4 };
    if (selectedPlan === 'quarterly') return { ngn: 4000, usd: 10 };
    return { ngn: 12000, usd: 30 };
  };

  const handleSimulatePayment = () => {
    setIsPaying(true);
    speakText("Ana gudanar da tura kudi, a jira kadan...", 'ha-NG');

    setTimeout(() => {
      setIsPaying(false);
      onSuccessPay();
      speakText("Masha Allah! Hanyar biya ta yi nasara. Yanzu kana da damar shiga dukkan rukununan darussan koyo na gari.", 'ha-NG');
    }, 2500);
  };

  return (
    <div id="checkout-portal-overlay" className="fixed inset-0 bg-[#1A1A1A]/80 z-50 flex items-center justify-center p-4">
      <div id="checkout-portal-card" className="bg-[#F8F6F0] rounded-2xl max-w-md w-full border border-emerald-900/10 shadow-2xl overflow-hidden relative">
        
        {/* Upper title */}
        <div className="bg-[#0F6B4B] p-5 text-[#F8F6F0] flex items-center justify-between border-b border-[#D4A017]/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A017] animate-pulse" />
            <h3 className="font-bold text-sm tracking-wide">Bude Dukkan Darussan Koyi (Premium)</h3>
          </div>
          <button 
            id="btn-close-checkout"
            onClick={onClose}
            className="text-emerald-100 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'plans' && (
          <div className="p-6 space-y-5 text-xs">
            <div className="space-y-1.5 text-center">
              <h4 className="text-sm font-extrabold text-[#0F6B4B]">Zabi Tsarin Biyan ku</h4>
              <p className="text-gray-500">Muna gabatar muku da hanya mafi sauki don koyon Turanci cikin sauri</p>
            </div>

            {/* Plan switch selectors lists */}
            <div className="space-y-3">
              <button
                id="btn-choose-monthly"
                onClick={() => setSelectedPlan('monthly')}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                  selectedPlan === 'monthly' ? 'border-[#0F6B4B] bg-emerald-500/5 ring-1 ring-[#0F6B4B]' : 'border-gray-200 bg-white'
                }`}
              >
                <div>
                  <p className="font-bold text-gray-800 text-sm">Biyan Wata Guda (Monthly)</p>
                  <p className="text-gray-400">Ana bada dukkan damar shiga da tattaunawa</p>
                </div>
                <span className="font-black text-sm text-emerald-900">NGN 1,500</span>
              </button>

              <button
                id="btn-choose-quarterly"
                onClick={() => setSelectedPlan('quarterly')}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                  selectedPlan === 'quarterly' ? 'border-[#0F6B4B] bg-emerald-500/5 ring-1 ring-[#0F6B4B]' : 'border-gray-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 text-sm">Biyan Watanni Uku (Quarterly)</p>
                    <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded text-[8px] font-bold uppercase">Popular</span>
                  </div>
                  <p className="text-gray-400">Save 11% compared to monthly intervals</p>
                </div>
                <span className="font-black text-sm text-emerald-900">NGN 4,000</span>
              </button>

              <button
                id="btn-choose-annual"
                onClick={() => setSelectedPlan('annual')}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                  selectedPlan === 'annual' ? 'border-[#0F6B4B] bg-emerald-500/5 ring-1 ring-[#0F6B4B]' : 'border-gray-200 bg-white'
                }`}
              >
                <div>
                  <p className="font-bold text-gray-800 text-sm">Shekara Guda (Annual)</p>
                  <p className="text-gray-400">Our absolute best value deal</p>
                </div>
                <span className="font-black text-sm text-emerald-900">NGN 12,000</span>
              </button>
            </div>

            {/* List of features */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-emerald-990/5">
              <p className="font-bold text-emerald-950 mb-1">Meye Amfanin Kasancewa Premium?</p>
              <div className="flex items-center gap-2 text-[11px] text-gray-605">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited conversations with Ustaz Nur</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-605">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Offline learning course downloads</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-605">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Downloadable academic credentials</span>
              </div>
            </div>

            <button
              id="btn-continue-checkout"
              onClick={() => setStep('pay_method')}
              className="w-full py-3.5 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-xl font-bold font-sans text-xs tracking-wider uppercase transition-all shadow"
            >
              Cigaba da Hanya (Select Payment Method)
            </button>
          </div>
        )}

        {step === 'pay_method' && (
          <div className="p-6 space-y-4 text-xs">
            <h4 className="font-bold text-sm text-center text-[#0F6B4B]">Hanyar Biyan Nigerian Paystack/Flutterwave</h4>
            
            <div className="flex gap-2">
              <button
                id="btn-switch-paystack"
                onClick={() => setPayGateway('paystack')}
                className={`flex-1 p-2 rounded-lg border text-center font-bold ${
                  payGateway === 'paystack' ? 'bg-[#D4A017]/15 border-[#D4A017] text-[#D4A017]' : 'bg-white border-gray-200'
                }`}
              >
                Paystack
              </button>
              <button
                id="btn-switch-flutterwave"
                onClick={() => setPayGateway('flutterwave')}
                className={`flex-1 p-2 rounded-lg border text-center font-bold ${
                  payGateway === 'flutterwave' ? 'bg-[#D4A017]/15 border-[#D4A017] text-[#D4A017]' : 'bg-white border-gray-200'
                }`}
              >
                Flutterwave
              </button>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-xl border">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-500">Plan Chosen:</span>
                <span className="font-bold text-gray-800 capitalize">{selectedPlan}</span>
              </div>
              <div className="flex justify-between items-center pt-1 font-bold">
                <span className="text-gray-700">Abinda zaka biya (Total Due):</span>
                <span className="text-emerald-900 text-base">NGN {getPrice().ngn.toLocaleString()}</span>
              </div>
            </div>

            {/* Dummy credit card fields */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="space-y-1">
                <label className="text-gray-600 font-semibold">Lambar Katin Bashi (Card Number Mock):</label>
                <input 
                  id="checkout-card-num"
                  type="text" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="5061 2923 1832 9901" 
                  maxLength={19}
                  className="w-full p-2.5 rounded-lg border bg-white text-gray-800 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-600 font-semibold">Lambar Waya (Phone Pin):</label>
                <input 
                  id="checkout-card-phone"
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 293 4912" 
                  className="w-full p-2.5 rounded-lg border bg-white text-gray-800"
                />
              </div>
            </div>

            <button
              id="btn-simulate-checkout-pay"
              onClick={handleSimulatePayment}
              disabled={isPaying}
              className="w-full py-3 bg-[#0F6B4B] hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow"
            >
              {isPaying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ana Tura Kudi...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Biya Ndu {getPrice().ngn.toLocaleString()} NGN (Checkout)
                </>
              )}
            </button>
            
            <button
              id="btn-back-to-plans"
              onClick={() => setStep('plans')}
              className="w-full text-center py-1 text-gray-500 hover:text-gray-650"
            >
              Baya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
