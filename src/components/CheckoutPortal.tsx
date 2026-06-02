/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CreditCard, Check, Sparkles, X, ShieldCheck, Landmark, Globe, Zap, Volume2 
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
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = () => {
    const trimmed = promoCode.trim().toUpperCase();
    if (trimmed === 'NUR2026') {
      setPromoSuccess("Lambar ragi ta yi aiki! An bude muku darussa kyauta. (Promo Code NUR2026 Applied successfully!)");
      setPromoError("");
      speakText("An yi nasarar gaskata lambar ragi ta NUR2026. An bude dukkan darussan koyo na premium kyauta.", 'ha-NG');
      setTimeout(() => {
        onSuccessPay();
      }, 1500);
    } else if (trimmed === '') {
      setPromoError("Don Allah shigar da lamba. (Please enter a code.)");
    } else {
      setPromoError("Wannan lamba ba daidai ba ce. Gwada NUR2026. (Invalid code. Try NUR2026.)");
      speakText("Wannan lamba ba ta da kyau. Don Allah sake gwadawa", 'ha-NG');
    }
  };

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

  const triggerAudio = (text: string) => {
    speakText(text, 'ha-NG');
  };

  return (
    <div 
      id="checkout-portal-overlay" 
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "checkout-portal-overlay") {
          onClose();
        }
      }}
      className="fixed inset-0 bg-[#1A1A1A]/80 z-50 flex items-center justify-center p-4 cursor-pointer"
    >
      <div 
        id="checkout-portal-card" 
        className="bg-[#F8F6F0] rounded-2xl max-w-md w-full max-h-[90vh] border border-emerald-900/10 shadow-2xl overflow-hidden relative flex flex-col cursor-default"
      >
        
        {/* Upper title */}
        <div className="bg-[#0F6B4B] p-5 text-[#F8F6F0] flex items-center justify-between border-b border-[#D4A017]/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A017] animate-pulse" />
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
              Bude Dukkan Darussan Koyi (Premium)
              <button 
                onClick={() => triggerAudio("Kun danna maɓallin Buɗe dukkan darussan koyon Turanci na premium. Wannan zai ba ku cikakken damar shiga dukkan rukununan dandalin Nur al-Ilm.")}
                className="p-1 text-white hover:text-amber-300 rounded transition-colors"
                title="Saurari Sauti"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </h3>
          </div>
          <button 
            id="btn-close-checkout"
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-1 rounded hover:bg-emerald-800 transition-colors"
            title="Fita"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'plans' && (
          <div className="p-6 space-y-5 text-xs overflow-y-auto flex-1 scrollbar-thin">
            <div className="space-y-1.5 text-center bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <h4 className="text-sm font-extrabold text-[#0F6B4B] flex items-center justify-center gap-2">
                Zabi Tsarin Biyan ku
                <button 
                  onClick={() => triggerAudio("Zaɓi tsarin biyan ku da ya fi dacewa da ku. Kuna iya zaɓar biyan wata guda, watanni uku, ko kuma shekara guda cif.")}
                  className="p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded"
                  title="Saurari Sauti"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </h4>
              <p className="text-gray-600">Muna gabatar muku da hanya mafi sauki don koyon Turanci cikin sauri</p>
            </div>

            {/* Plan switch selectors lists */}
            <div className="space-y-3">
              <div className="relative">
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
                  onClick={() => triggerAudio("Biyan wata guda akan naira dubu ɗaya da ɗari biyor kawai domin samun damar yin amfani da dandalin a cikin wannan wata guda.")} 
                  className="absolute right-24 top-4 p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded-full bg-emerald-100/30"
                  title="Saurari Wata Guda"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
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
                  onClick={() => triggerAudio("Biyan watanni uku akan naira dubu huɗu. Wannan yana ba ku damar duba dukkan darussa ba tare da yankewa ba, kuma kuna samun ragi na kashi goma sha ɗaya.")} 
                  className="absolute right-24 top-4 p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded-full bg-emerald-100/30"
                  title="Saurari Watanni Uku"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
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
                <button 
                  onClick={() => triggerAudio("Biyan shekara guda akan naira dubu sha biyu cif. Wannan shi ne zaɓi mafi kyau kuma mafi arha a gare ku na tsawon shekara guda gabaɗaya.")} 
                  className="absolute right-24 top-4 p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded-full bg-emerald-100/30"
                  title="Saurari Shekara Guda"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List of features */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-emerald-990/5">
              <p className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                Meye Amfanin Kasancewa Premium?
                <button 
                  onClick={() => triggerAudio("Amfanin kasancewa premium ya haɗa da: tattaunawa ta musamman da Ustaz Nur ba tare da iyaka ba, saukar da darussa don amfani na offline, da kuma samun shaidar karatu ta musamman bayan ku kammala kullum.")}
                  className="p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </p>
              <div className="flex items-center gap-2 text-[11px] text-gray-605">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Conversations completely unlocked with Ustaz Nur</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-605">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Offline vocational study package cache key</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-605">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Academic certificate generation unlocked</span>
              </div>
            </div>

            {/* Promo Code Subsection */}
            <div className="bg-yellow-50 border border-amber-300 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-amber-900 text-xs">Kuna da Lambar ragi? (Have a promo code?)</p>
                  <button 
                    onClick={() => triggerAudio("Kuna da lambar ragi? Rubuta lambar ragi ta kyauta wato N U R biyu sifili biyu shida, sannan ku danna maɓallin Shigar domin buɗe dukkan ayyukan kyauta ba tare da biyan ko kwabo ba.")}
                    className="p-1 text-amber-800 hover:text-amber-950 rounded"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded font-black uppercase">Kyauta</span>
              </div>
              <p className="text-[10px] text-amber-850">Kuna iya amfani da lambar ragi <strong>NUR2026</strong> domin samun cikakken shiga dandalin kyauta.</p>
              
              <div className="flex gap-1.5 mt-2">
                <input 
                  id="checkout-promo-code"
                  type="text"
                  placeholder="Shigar da lambar sirri"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError("");
                    setPromoSuccess("");
                  }}
                  className="flex-1 p-2 border border-amber-300 rounded-lg bg-white text-gray-800 font-bold tracking-widest uppercase focus:outline-none focus:ring-1 focus:ring-[#D4A017] text-xs"
                />
                <button
                  id="checkout-apply-promo"
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-[#D4A017] hover:bg-amber-600 text-white font-bold rounded-lg transition-all text-[11px] shrink-0"
                >
                  Shigar (Apply)
                </button>
              </div>
              {promoError && <p className="text-red-600 text-[10px] font-bold mt-1">{promoError}</p>}
              {promoSuccess && <p className="text-[#0F6B4B] text-[10px] font-bold mt-1">{promoSuccess}</p>}
            </div>

            <button
              id="btn-continue-checkout"
              onClick={() => {
                setStep('pay_method');
                triggerAudio("Cigaba da Hanya don zaɓar hanyar da za ku biya kuɗi ta katin banki.");
              }}
              className="w-full py-3.5 bg-[#0F6B4B] hover:bg-emerald-800 text-[#F8F6F0] rounded-xl font-bold font-sans text-xs tracking-wider uppercase transition-all shadow flex items-center justify-center gap-1.5"
            >
              Cigaba da Hanya (Select Payment Method)
              <Volume2 className="w-4 h-4 text-[#D4A017]" />
            </button>

            <button
              id="btn-close-secondary"
              onClick={onClose}
              className="w-full py-2 border border-gray-300 hover:bg-gray-100 text-gray-600 rounded-xl font-bold text-center text-xs transition-colors"
            >
              Fita daga nan (Exit Dialog)
            </button>
          </div>
        )}

        {step === 'pay_method' && (
          <div className="p-6 space-y-4 text-xs overflow-y-auto flex-1 scrollbar-thin">
            <h4 className="font-bold text-sm text-center text-[#0F6B4B] flex items-center justify-center gap-1.5">
              Hanyar Biyan Nigerian Paystack/Flutterwave
              <button 
                onClick={() => triggerAudio("Zaɓi hanyar da kuke so ku tura kuɗi, ko dai ta hanyar Paystack ko kuma Flutterwave.")}
                className="p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </h4>
            
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
                <span className="text-gray-700 flex items-center gap-1">
                  Abinda zaka biya (Total Due):
                  <button 
                    onClick={() => triggerAudio("Kuɗin da za a cire a cikin katin bankinku.")}
                    className="p-1 text-[#0F6B4B] hover:text-[#D4A017] rounded"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </span>
                <span className="text-emerald-900 text-base">NGN {getPrice().ngn.toLocaleString()}</span>
              </div>
            </div>

            {/* Dummy credit card fields */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="space-y-1">
                <label className="text-gray-600 font-semibold flex items-center gap-1">
                  Lambar Katin Bashi (Card Number Mock):
                  <button 
                    onClick={() => triggerAudio("Shigar da lambobin katin bankinku a nan.")}
                    className="p-1 text-gray-500 hover:text-[#0F6B4B]"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </label>
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
                <label className="text-gray-600 font-semibold flex items-center gap-1">
                  Lambar Waya (Phone Pin):
                  <button 
                    onClick={() => triggerAudio("Shigar da lambar wayarku na sirri domin kammala wannan tsari na biyan kuɗi.")}
                    className="p-1 text-gray-500 hover:text-[#0F6B4B]"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </label>
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
                  Biya {getPrice().ngn.toLocaleString()} NGN (Checkout)
                </>
              )}
            </button>
            
            <button
              id="btn-back-to-plans"
              onClick={() => setStep('plans')}
              className="w-full text-center py-2 text-gray-500 hover:text-gray-700 bg-gray-150 rounded"
            >
              Koma baya (Back)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
