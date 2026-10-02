import React, { useState } from 'react';
import { useTextile } from '../context/TextileContext';
import { WhatsAppMessageItem } from '../types';
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  CheckCheck, 
  Clock, 
  ShieldCheck, 
  Bot, 
  ArrowRight, 
  FileText, 
  CheckCircle2,
  Phone,
  User,
  ShoppingBag,
  Plus,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WhatsAppMarketing: React.FC = () => {
  const { whatsAppMessages, convertWhatsAppDraft, sendWhatsAppReply, addAuditLog, triggerToast } = useTextile();
  const [selectedMessageId, setSelectedMessageId] = useState<string>(whatsAppMessages[0]?.id || '');
  const [replyText, setReplyText] = useState<string>('');
  const [activeTabSub, setActiveTabSub] = useState<'inbox' | 'templates'>('inbox');
  const [simulatingAi, setSimulatingAi] = useState<boolean>(false);

  const selectedMsg = whatsAppMessages.find(m => m.id === selectedMessageId) || whatsAppMessages[0];

  const handleConvertDraft = (msgId: string) => {
    convertWhatsAppDraft(msgId);
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMsg) return;
    sendWhatsAppReply(selectedMsg.id, replyText.trim());
    triggerToast(`WhatsApp message delivered to ${selectedMsg.partyName}`, 'success');
    setReplyText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            WhatsApp Business & AI Assistant
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
            Buyer communications, broadcast templates, and automatic natural-language order drafts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTabSub('inbox')}
            className={activeTabSub === 'inbox' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem' }}
          >
            <MessageSquare size={14} />
            <span>Active Inbox & AI Drafter</span>
          </button>
          <button
            onClick={() => setActiveTabSub('templates')}
            className={activeTabSub === 'templates' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem' }}
          >
            <FileText size={14} />
            <span>Approved Meta Templates</span>
          </button>
        </div>
      </div>

      {activeTabSub === 'inbox' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: '20px' }}>
          
          {/* Left: Chat Threads List */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', height: '620px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0 4px 6px 4px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Verified Buyer Conversations</span>
              <span>{whatsAppMessages.length} Active</span>
            </div>

            {whatsAppMessages.map(msg => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessageId(msg.id)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedMessageId === msg.id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  border: selectedMessageId === msg.id ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>
                    {msg.partyName}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {msg.timestamp}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.messageText}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
                    {msg.phoneNumber}
                  </span>
                  {msg.extractedOrderDraft && (
                    <span className="badge badge-gold" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                      <Bot size={10} /> AI Order Ready
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Active Chat & AI Extraction Card */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', height: '620px' }}>
            
            {/* Chat header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div>
                <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                  {selectedMsg?.partyName}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {selectedMsg?.phoneNumber}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-emerald">
                  <Clock size={11} /> 24h Customer Service Window Active
                </span>
                <span className="badge badge-cyan">
                  Double Opt-In Verified
                </span>
              </div>
            </div>

            {/* Chat messages viewport */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px' }}>
              
              <div style={{
                alignSelf: 'flex-start',
                maxWidth: '85%',
                background: '#162238',
                border: '1px solid var(--border-medium)',
                borderRadius: '12px 12px 12px 2px',
                padding: '12px 16px',
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}>
                <div>{selectedMsg?.messageText}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
                  {selectedMsg?.timestamp}
                </div>
              </div>

              {/* AI Order Extraction Card (Section 11 & 17) */}
              {selectedMsg?.extractedOrderDraft && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.85rem' }}>
                      <Bot size={18} />
                      <span>Natural Language Order Extracted by Gemini AI</span>
                    </div>
                    <span className="badge badge-gold">Pending Human Approval</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                    The customer's casual message has been parsed into a structured wholesale sales order. Approving below will instantly allocate physical inventory and lock credit headroom.
                  </div>

                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                    <div>Design SKU: <strong>{selectedMsg.extractedOrderDraft.designCode}</strong></div>
                    <div>Color Breakdown: <strong>{selectedMsg.extractedOrderDraft.quantities.map(q => `${q.color}: ${q.qty}`).join(', ')}</strong></div>
                    <div>Total Quantity: <strong>{selectedMsg.extractedOrderDraft.totalSets} Bridal Sets</strong></div>
                    <div>Contract Wholesale Rate: <strong>₹{selectedMsg.extractedOrderDraft.suggestedRate.toLocaleString('en-IN')}</strong></div>
                    <div style={{ marginTop: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '4px', color: 'var(--accent-emerald)', fontWeight: 800 }}>
                      Calculated Order Gross Value: ₹{(selectedMsg.extractedOrderDraft.totalSets * selectedMsg.extractedOrderDraft.suggestedRate).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleConvertDraft(selectedMsg.id)}
                    className="btn-emerald"
                    style={{ width: '100%', fontSize: '0.82rem', padding: '8px' }}
                  >
                    <CheckCircle2 size={15} />
                    <span>Confirm Order & Execute Atomic Reservation</span>
                  </button>
                </div>
              )}

            </div>

            {/* Input Bar */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                placeholder="Type official WhatsApp reply message..."
                className="input-field"
                style={{ height: '40px' }}
              />
              <button 
                onClick={handleSendReply}
                className="btn-primary"
                style={{ padding: '0 16px', height: '40px' }}
              >
                <Send size={15} />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Official Approved Meta Templates View */}
      {activeTabSub === 'templates' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          
          {/* Template 1 */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge badge-emerald">Category: Marketing</span>
              <span className="badge badge-gray">TEMPLATE-CATALOG-01</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>
              Festive Bridal Collection Release
            </h3>
            <div style={{ background: 'rgba(10, 13, 20, 0.7)', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              "Dear {`{{1}}`}, TextileFlow Surat presents the new Velvet Embroidered Bridal Lehenga collection {`{{2}}`}. Tap the link to view the private watermarked wholesale catalogue: {`{{3}}`}. Reply STOP to unsubscribe."
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Requires Active Customer Double Opt-In • Meta Cloud API Compliant
            </div>
          </div>

          {/* Template 2 */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge badge-cyan">Category: Utility</span>
              <span className="badge badge-gray">TEMPLATE-DISPATCH-02</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>
              Consignment Dispatch & Transporter LR Notification
            </h3>
            <div style={{ background: 'rgba(10, 13, 20, 0.7)', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              "Hello {`{{1}}`}, your order {`{{2}}`} has been packed and handed over to {`{{3}}`}. Transporter LR / Bilty No: {`{{4}}`}. Tamper-evident seals are intact. Track consignment via our portal."
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Triggered automatically upon warehouse dispatch confirmation
            </div>
          </div>

          {/* Template 3 */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge badge-gold">Category: Utility</span>
              <span className="badge badge-gray">TEMPLATE-PAYMENT-03</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>
              Payment & Advance Settlement Receipt
            </h3>
            <div style={{ background: 'rgba(10, 13, 20, 0.7)', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              "Dear {`{{1}}`}, we acknowledge receipt of ₹{`{{2}}`} via NEFT/RTGS (Bank UTR: {`{{3}}`}). The amount has been credited to your active ledger against Tax Invoice {`{{4}}`}. Thank you!"
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Triggered automatically upon bank payment verification
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
