# TextileFlow — ટેક્સટાઇલ બિઝનેસ મેનેજમેન્ટ સોફ્ટવેર
## Yogesh AI Hub | સૂચિત માસ્ટર પ્લાન v1.0

તારીખ: 2 ઑક્ટોબર 2026  
સ્થિતિ: આયોજન માટેનો પ્રસ્તાવ; હજી સોફ્ટવેરનું અમલીકરણ કે વાસ્તવિક કંપનીના ડેટાનું પરીક્ષણ કરેલું નથી.

## 1. હેતુ અને કાર્યક્ષેત્ર

સાડી અને લેહંગાના હોલસેલ બિઝનેસ માટે સેમ્પલ પસંદગી, ખાતા/સપ્લાયર, ખરીદી અથવા જોબવર્ક, ગુણવત્તા ચકાસણી, સ્ટોક, કેટલોગ, WhatsApp માર્કેટિંગ, ગ્રાહક ઓર્ડર, ડિસ્પેચ, પેમેન્ટ અને નફાની માહિતી એક જ વેબ-આધારિત સિસ્ટમમાં જોડવી.

મુખ્ય પ્રશ્ન: **કયો માલ, કેટલો, કોનો, ક્યાં, કયા તબક્કે અને કયા ઓર્ડર માટે છે—તેની સામે કેટલો ખર્ચ, કેટલું વેચાણ અને કેટલું પેમેન્ટ થયું છે?**

અહીં “ખાતા”નો અર્થ ઉત્પાદન કરનાર યુનિટ/કારીગર/જોબવર્ક પાર્ટી છે; નાણાકીય ખાતું અલગ મોડ્યુલ છે. પ્રસ્તાવિત નામ કામચલાઉ છે, અંતિમ બ્રાન્ડ નિર્ણય નથી.

આ પ્રસ્તાવ એક હોલસેલ કંપનીથી પાઇલટ શરૂ કરે છે. પોતાની ફેક્ટરી હોવી ફરજિયાત નથી. પહેલી આવૃત્તિમાં આખા ભારત માટે જાહેર marketplace, સંપૂર્ણ payroll, મશીન કંટ્રોલ કે forecastingનો સમાવેશ નથી.

## 2. ત્રણ વ્યવસાયિક માર્ગ

| માર્ગ | કામ કરવાની રીત | સોફ્ટવેરમાં નોંધ |
|---|---|---|
| તૈયાર માલ ખરીદી | ખાતાને ડિઝાઇન, ભાવ અને જથ્થો આપવો; તૈયાર માલ લેવો | Purchase Order, supplier progress, inward, QC, bill, payable |
| પોતાના માલ પર જોબવર્ક | પોતાનું કાપડ/મટિરિયલ આપી એમ્બ્રોઇડરી, સ્ટિચિંગ વગેરે કરાવવું | Material issue, job order, vendor-location stock, stage quantities, consumption, wastage, job charges |
| પોતાનું ઉત્પાદન | પોતાની ટીમ/મશીનથી અમુક કે બધા તબક્કા ચલાવવા | એ જ job/stage મોડેલ; વધારામાં capacity, machine અને labour planning |

**બન્ને પ્રથમ માર્ગ MVPમાં મૂળભૂત રીતે આવવા જોઈએ.** એમ્બ્રોઇડરી/ખાતા ટ્રેકિંગને માત્ર ભવિષ્યનો વિકલ્પ બનાવવો નહીં. ત્રીજો માર્ગ વિસ્તરણ માટે રાખવો.

સપ્લાયર પાસેથી ખરીદવાનો બાકી માલ અને આપણો માલ જે સપ્લાયર પાસે પડ્યો છે—આ બંનેને એક જ inventory ગણવી નહીં. માલિકી અને માલનું ભૌતિક સ્થાન અલગ fields રહેશે. માલિકી બદલવાનો ચોક્કસ તબક્કો ખરીદીની શરતો અને accountantની મંજૂરી અનુસાર નક્કી કરવો.

## 3. સંપૂર્ણ મુખ્ય પ્રવાહ

સેમ્પલ/ડિઝાઇન → મંજૂરી અને અંદાજિત ખર્ચ → Purchase Order અથવા Job Order → ઉત્પાદન/ખાતા પ્રગતિ → માલ આવક → QC → વેચી શકાય એવો સ્ટોક → કેટલોગ/સેમ્પલ વિતરણ → પૂછપરછ → ભાવપત્રક → ઓર્ડર મંજૂરી → સ્ટોક અનામત → પેકિંગ → ઇન્વૉઇસ/જરૂરી દસ્તાવેજ → ડિસ્પેચ → ડિલિવરી → પેમેન્ટ → રિટર્ન/દાવો → વાસ્તવિક નફો અને ફરી ઓર્ડર.

આ એક કડક સીધી લાઇન નથી: ઉત્પાદન ચાલતું હોય ત્યારે પણ pre-order લઈ શકાય; એક ઓર્ડર ભાગે ભાગે આવી અને મોકલી શકાય; માલ ખાતાથી બીજા ખાતા કે સીધો ગ્રાહક સુધી જઈ શકે. દરેક આવા માર્ગ માટે અધિકૃત દસ્તાવેજ અને traceability જોઈએ.

## 4. પાયાની ડેટા રચના

### ડિઝાઇન, SKU અને lotનો ભેદ

- Design: મૂળ ઉત્પાદનની ઓળખ, જેમ કે `LH-101`.
- Approved sample version: મંજૂર દેખાવ/કામનું સંસ્કરણ, જેમ કે `V2`.
- SKU: વેચાણ/સ્ટોકની ચોક્કસ આવૃત્તિ, જેમ કે `LH-101-RED-M`.
- Lot/batch/shade: બનાવટનો અલગ જથ્થો; એક SKUના અલગ lots વચ્ચે રંગમાં ફરક હોય તો અલગ પસંદગી.

ખરીદી અને sales documentsમાં સંબંધિત version, rate, tax અને quantityનું તે સમયનું snapshot રાખવું. પછી design master બદલવાથી જૂના ઓર્ડર બદલાય નહીં.

### સેટ અને માપ

લેહંગા + ચોળી + દુપટ્ટાનો એક ગ્રાહક-સેટ, અને છ રંગના છ અલગ સેટનું વેપારી pack—આ બે જુદી રચનાઓ છે. એકને `kit/components`, બીજાને `assortment/pack composition` તરીકે સાચવવું.

દરેક itemનું base unit સ્પષ્ટ: meter, piece, complete set વગેરે. Meterથી garment બનવું સામાન્ય unit conversion નથી; તેના માટે approved material recipe/BOM અને actual consumption જોઈએ. Roll માટે વાસ્તવિક length રાખવી. Mixed-colour packsમાં દરેક SKUનું જથ્થું રાખવું; બધા packs સમાન છે એમ માનવું નહીં.

### પાર્ટી અને સ્થાન

ગ્રાહક/સપ્લાયરના નામ, mobile, GST વિગતો, billing/shipping addresses, શહેર/રાજ્ય, ભાવવર્ગ, credit terms, salesperson/agent, consent અને નોંધો. એક જ party ખરીદનાર અને સપ્લાયર પણ હોઈ શકે.

સ્થાનો: shop, godown, rack/bin, QC hold, sample room, vendor location, transit અને damaged stock. કંપનીની માલિકી વગરના consignment/customer-owned goods અલગ ઓળખવા.

## 5. સેમ્પલ અને ડિઝાઇન લાઇબ્રેરી

દરેક ડિઝાઇનમાં ફોટા/વિડિયો, category, fabric, work type, colour/shade, size, components, season/occasion, supplier, rate quotation, minimum quantity, estimated lead time અને design files રાખવા.

સેમ્પલ સ્થિતિ: Draft → Review → Change requested → Approved → Discontinued. Approvalમાં કોણે, ક્યારે, કયો version, કયા ભાવ અને કયા specifications મંજૂર કર્યા તે નોંધવું. Production શરૂ થયા પછી ફેરફાર માટે નવું revision અને approval જોઈએ.

સપ્લાયરના ફોટા, પોતાની photography અને પ્રકાશિત કેટલોગનો ભેદ રાખવો. બહાર મોકલેલી contentમાં source, usage permission અને watermark setting રાખવી.

Physical sample registerમાં મોકલનાર, મેળવનાર, sample SKU/lot, quantity, dispatch date, return due date, deposit/charge, courier અને હાલની સ્થિતિ રાખવી. Digital catalogue shareથી stock ઓછો નહીં થાય. Physical sample movementથી સ્થાન બદલાય; sample વેચાય તો અધિકૃત sales conversion જરૂરી.

## 6. ખાતા/સપ્લાયર અને ખરીદી

દરેક ખાતાની કામની વિશેષતા, સંપર્ક, સરનામું, અંદાજિત capacity, rate history, lead time, advance, outstanding, defects, delay અને disputesની નોંધ રાખવી.

Purchase Orderમાં approved design/SKU version, colour-size breakup, quantity, rate basis, taxes, delivery location, due date, installment schedule, advance, freight terms, tolerance અને replacement terms રહેશે.

POથી supplier progress update અને follow-up task બનશે. Partial receipt અને partial cancellation line-level પર રહેશે. Oversupply tolerance બહાર હોય તો manager approval; verbal rate changeને સીધું billમાં સ્વીકારવું નહીં.

ચુકવણી પહેલાં ત્રણ વસ્તુ સરખાવવી: **ઓર્ડરમાં મંજૂર quantity/rate, QCથી સ્વીકારેલો માલ અને supplier bill.** Differences માટે exception queue; બધા bills માટે અંધ automatic payment નહીં.

## 7. એમ્બ્રોઇડરી અને જોબવર્ક

દરેક job orderમાં parent purchase/sales orderનો સંબંધ, design version, input material, issued quantity, rate basis, expected output, due date અને જવાબદાર ખાતું રહેશે.

સૂચિત stages: material ready → embroidery → handwork → stitching → finishing → QC → packing. સાડી/લેહંગા અને સપ્લાયર પ્રમાણે stages બદલવા/skip કરવાની મંજૂરી રહેશે.

દરેક stageનું માત્ર “Complete” બટન પૂરતું નહીં. Input, good output, pending, rejected, rework અને wastage quantity સાથે reason અને evidence રાખવા. એક જ unitની બે વાર ગણતરી ન થાય તે માટે approved stage transactions અને return links જરૂરી.

એક batch બે ખાતામાં વહેંચી શકાય. Embroidery ખાતાથી stitching ખાતા સુધી સીધો transfer પણ company-authorised movement સાથે નોંધાય. Vendorએ update કર્યું એટલે final acceptance નહીં: authorised inward/QCથી જ સ્વીકાર થાય.

માલ આપણા માલિકીનો હોય તો vendor પાસે પડેલો stock, vendorથી પરત આવતો material, scrap અને leftover બધું reconcile થાય. Finished goods purchaseમાં supplierનું પોતાનું material આપણી inventoryમાં ન આવવું જોઈએ.

Job-work challan અને movement references માટે fields તથા document generation રાખવું; લાગુ GST વ્યવસ્થામાં principal દ્વારા challan સાથે માલ મોકલવાની જોગવાઈ છે. ચોક્કસ applicability, reporting અને deadline configuration accountant દ્વારા ચકાસવા. [S2]

પ્રથમ આવૃત્તિમાં manual/photo-backed status અને સરળ vendor update link પૂરતા; machine-level automatic data capture અલગ integration પ્રોજેક્ટ ગણવો.

## 8. માલ આવક અને ગુણવત્તા ચકાસણી

Goods Receiptમાં PO/job reference, physically received quantity, date, location, transporter અને received-by નોંધવા. Bill મળ્યો હોય કે ન મળ્યો હોય, goods receipt અલગ દસ્તાવેજ છે.

QCમાં colour/shade match, embroidery/design, fabric, stitching, stains, damage, measurement અને set components ચકાસવા. પરિણામ: Accepted, Hold, Rework, Rejected. દરેક ભાગનું અલગ quantity અને ફોટા.

QC pass થયેલો અને યોગ્ય saleable locationમાં રહેલો માલ જ વેચાણ માટે ઉપલબ્ધ. Missing componentવાળો લેહંગા set complete set તરીકે ન ગણાય. Reject/rework માલ માટે vendor return, replacement અથવા approved concession પ્રક્રિયા.

Short receipt, missing carton, excess pieces અને freight damage માટે અલગ claim. QC failureની જવાબદારી supplier/transport/internal છે કે નક્કી કરવાનું બાકી છે તે પણ નોંધવી.

## 9. સ્ટોક અને આરક્ષણ

Stock ledger દરેક physical/cost transaction રાખશે: inward, transfer, job issue, consumption, production output, sample movement, dispatch, return, damage અને approved adjustment. Reservation અલગ commitment ledgerમાં રહેશે; તે physical stock movement નથી.

**તાત્કાલિક વેચાણ માટે ઉપલબ્ધ = પસંદ કરેલા saleable locationsમાં QC-pass physical quantity − ત્યાંની active reservations.**

QC hold, sample, damaged અને vendor/WIP quantity પહેલેથી saleable poolની બહાર હોય તો તેને બીજી વાર ઘટાડવી નહીં. In-production અથવા incoming stockને future availabilityમાં બતાવવું, ready stockમાં નહીં.

Reservationsમાં order line, SKU/lot, quantity, expiry policy અને priority. Cancellation/expiryથી અનામત છોડાય; dispatch વખતે reserved અને physical quantity યોગ્ય રીતે ઘટે. બે કર્મચારી છેલ્લો એક જ સેટ બુક કરે તેવા race condition સામે database transaction અને row-locking/atomic update જરૂરી. PostgreSQL આ પ્રકારના row locks આપે છે. [S7]

Barcode/QRથી SKU/lot/rack પસંદગી; scan પછી staff quantity અને item preview જોઈ શકે. Stock countમાં physical count, difference reason, approval અને adjustment ledger entry. જૂની entries delete કરીને જથ્થો “સાચો” કરવો નહીં.

FIFO કે weighted-average જેવી costing policy accountant સાથે નક્કી કરવી; physical pickingમાં જરૂરી shade consistency જાળવવી. Return મૂળ lot/cost સાથે જોડવો જ્યાં શક્ય હોય.

## 10. કેટલોગ, physical samples અને CRM

એક product libraryમાંથી approved photos સાથે private catalogue link અને shareable catalogue document તૈયાર કરવું. Customer પ્રમાણે rate visibility, wholesale price tier, MOQ, available colours, availability અને quotation validity બતાવવી.

Public linkમાં purchase cost, supplier contact અથવા બીજા ગ્રાહકની deal ક્યારેય ન દેખાય. Confidential rate list માટે login/OTP અને access expiry. Watermark મદદરૂપ control છે; screenshotની સંપૂર્ણ રોકથામની ખાતરી નથી.

CRMમાં party master, geographic segment, product preference, price band, salesperson, last interaction, next follow-up, quote history, samples sent, open orders અને outstanding એક જ profileમાં.

Physical sample circulation માટે return reminders અને pending-sample report. Agent પાસેની samples અને ગ્રાહકને approval માટે મોકલેલો sale-or-return માલ સામાન્ય completed saleથી અલગ રાખવો.

Customer portal પછીના તબક્કે: પોતાનો catalogue, enquiry/cart, own orders, invoice, dispatch અને statement. Portal order પહેલાં પણ availability/price/credit server-side recheck કરવો.

## 11. WhatsApp અને માર્કેટિંગ

Official WhatsApp Business Platformને કેન્દ્રમાં રાખવું. Shared inbox, salesperson assignment, approved catalogue send, reply tagging, follow-up tasks અને relevant status notifications રાખવા.

Customer opt-in, source/date, message preference અને opt-out history સાચવવી. WhatsAppની policy પ્રમાણે opt-in જરૂરી છે; customerના છેલ્લાં messageથી ખુલતી 24-hour service window બહાર business messages માટે approved templates જરૂરી છે. Template category અને લાગુ usage cost અલગ સંભાળવા. [S1]

Unsolicited bulk lists અને unofficial WhatsApp-Web scraping પર સિસ્ટમનો આધાર નહીં. Public campaigns મોકલતાં પહેલાં preview, audience count, consent filter, cost limit અને authorised approval.

Message states: queued, sent, delivered, read જ્યાં ઉપલબ્ધ, failed અને opted-out. Read receipt અથવા link openને ખરીદીનું કારણ માનવું નહીં; campaignથી આવેલી enquiry/confirmed orderને ચોક્કસ mapping હોય ત્યાં જ attributable બતાવવું.

AI raw messages, voice notes અથવા screenshotsમાંથી order draft સૂચવી શકે. Colour, quantity, price અથવા design અસ્પષ્ટ હોય તો “needs confirmation”. Human approval પહેલાં stock reserve, invoice અથવા payment posting નહીં. આવનારા messageના provider IDથી duplicate draft અટકાવવો.

જૂનો WhatsApp history આપોઆપ સંપૂર્ણ import થઈ જશે એવી ધારણા નહીં. Existing number onboarding, supported migration/coexistence, permissions અને API scope integration પહેલાં ચકાસવા.

## 12. ઓર્ડર અને ભાવ વ્યવસ્થા

Inquiry → Quotation → Confirmation review → Credit/price approval → Confirmed order → Allocated/backorder → Partially dispatched → Fulfilled/cancelled.

એક orderમાં અનેક designs, colours, sizes અને packs; quantity/rate/tax line-level. Agent commission, customer-specific rate, quantity slab, negotiated discount, payment terms અને shipping address અલગથી.

Ready-stock order અને make-to-order અલગ. Stock ઓછો હોય તો split delivery, backorder, purchase suggestion અથવા production orderનો વિકલ્પ; system ખોટી ready-stock promise ન આપે.

Minimum-margin અને discount limitથી બહાર હોય તો approval. Credit exposureમાં unpaid invoices અને મંજૂર પરંતુ હજી invoice ન થયેલી commitmentsનો સ્પષ્ટ સમાવેશ; invoice થઈ ગયેલા order ભાગને commitmentsમાં ફરી ગણવો નહીં અને અગાઉ adjust થયેલું advance ફરીથી ઘટાડવું નહીં.

Credit hold માટે owner override હોય પણ reason, person અને time auditમાં રહે. Overdue ગ્રાહકને પ્રસ્તાવિત કડક નિયમ લાગુ કરતાં પહેલાં company policy મંજૂર કરવી.

Order book, fulfilment, invoice અને payment statuses અલગ રાખવા. Advance મળવું એટલે આખું વેચાણ પૂર્ણ નથી; dispatch થવું એટલે collection પૂર્ણ નથી.

## 13. પેકિંગ, ડિસ્પેચ અને ડિલિવરી

Approved orderથી pick list → SKU/lot scan → quantity check → component check → packing list → carton/bale ID → invoice/challan → transporter handover.

Packing listમાં દરેક cartonની SKU-wise quantity, weight, dimensions જ્યાં જરૂરી, seal, packer અને checker. Invoice number અને transporter LR/AWB અલગ ઓળખ.

એક order અનેક dispatchમાં જઈ શકે; એક dispatch ઘણા ordersને serve કરે તો line-level allocation જોઈએ. Pending quantity auto-update થાય. Freight paid/to-pay, booked date, expected delivery, tracking અને proof of delivery રાખવા.

Transporter API ન હોય તો manual LR/tracking entry. Failed integrationથી actual dispatch ગુમ ન થાય; retry અને reconciliation queue જોઈએ.

Wrong-item, short delivery, lost parcel અને delivery refusal માટે exception workflow. Stock dispatch કરતાં પહેલાં authorization, document readiness અને applicable compliance gate ચેક થાય.

## 14. પેમેન્ટ, રિટર્ન અને હિસાબ

Customer-wise receivable, supplier-wise payable, advance, invoice allocations, due dates, aging, debit/credit notes, refunds અને disputes રાખવા. એક receipt ઘણી invoices સામે અને એક invoice ઘણી receiptsથી settle થઈ શકે.

Bank/UPI reference અને attachments રાખવા. Screenshot uploadને verified bank receipt ન ગણવો; authorised reconciliation પછી cleared status. Automated reminders માટે customer contact preference અને company-approved wording.

Return flow: request → authorised return reference → physical receipt → QC → restock/rework/damage/vendor claim → credit note/replacement/refund. Credit note અને goods movement અલગ પણ જોડાયેલા records.

Agent commission માટે rule પહેલાં નક્કી: invoice પર, delivery પર કે realised collection પર. Return/cancellation થાય તો reversal. Commission expense બતાવ્યા વગર તેને net profit કહેવો નહીં.

MVP operational subledger આપશે; સંપૂર્ણ statutory accounting/GST filing engine બનાવવું પહેલેથી ફરજિયાત નથી. Existing Tally જેવી accounting system હોય તો approved export/importથી શરૂ કરી શકાય. TallyPrime official XML/HTTP integration આપે છે; cloud app સાથે actual connectivity, version, mapping અને reconciliation અલગથી લાગુ કરવા પડે. [S5]

બંને સિસ્ટમમાં એક જ voucher વારંવાર ન બને તે માટે external IDs, sync status અને idempotency. Desktop accountingના portને ખુલ્લા public internet પર મૂકવાને બદલે સુરક્ષિત local connector/VPN જેવી controlled connectivity ડિઝાઇન કરવી.

## 15. GST અને દસ્તાવેજોની તૈયારી

GSTIN, HSN/SAC, place of supply, state codes, effective-date tax rules, invoice series, reverse/credit documents, transporter details અને applicable references માટે configurable fields રાખવા. સાડી, stitched set અને job-work service માટે એક જ tax rate કાયમ hard-code ન કરવો.

e-Invoiceનો અર્થ માત્ર invoice PDF નહીં: notified transactions માટે IRPથી IRN/QR મેળવવાની વ્યવસ્થા છે. Applicability supplier/company profile પ્રમાણે ચકાસવી. E-way bill માટે movement type, value, distance, parties અને exceptionsની settings જોઈએ; job-workની અમુક situationsમાં સામાન્ય value thresholdથી અલગ શરતો હોઈ શકે. [S3][S4]

જે pilot કંપની માટે e-Invoice/e-way bill ફરજિયાત હોય, તેની આવશ્યક પ્રક્રિયા launch પહેલાં જ ઉપલબ્ધ રાખવી: authorised integration અથવા મંજૂર portal-based process અને verification. તેને “પછીનું feature” કહીને નિયમભંગ થવા ન દેવો.

આ પ્લાન tax opinion નથી. CA/accountant દ્વારા tax classification, job-work compliance, document sequence, current notification અને company-specific applicability sign-off થયા પછી જ production use.

## 16. વાસ્તવિક costing અને માલિકનો dashboard

Estimated અને actual ખર્ચ અલગ બતાવવા. Own-material jobમાં consumed material, embroidery, stitching, finishing, packing, inward freight, approved rework અને applicable non-creditable costs ગણવા. Finished-goods purchaseમાં supplierના rateમાં પહેલેથી આવતો કામનો ખર્ચ ફરી ઉમેરવો નહીં.

સરળ સમજણ:

**Gross profit = tax વગરનું net invoiced sales − વેચાયેલા માલનો cost.**  
**Gross margin % = gross profit ÷ net invoiced sales × 100.**

Freight-out, agent commission અને અન્ય selling expenses બાદ contribution અલગ બતાવવું. Salary, rent, finance cost અને બાકીના overhead વગર “net profit” નામ ન આપવું. Returns/credit notes અને late supplier billsથી reports adjust થાય; estimate/final flag રાખવો.

Owner dashboardમાં આજે/આ મહિને orders, net invoiced sales, collection, margin, overdue, ready stock, vendor stock, pending production, delayed dispatch અને returns અલગ cards.

Top sellerને ચાર રીતે જુઓ: net units, net sales value, gross profit અને repeat-order count. High sales હોવા છતાં low-margin કે high-return design અલગ દેખાય. Period, branch, product, salesperson અને customer filters જરૂરી.

## 17. સૂચિત AI અને automation

### નિયમ આધારિત automation — શરૂઆતમાં

Approved POના due-date reminders; vendor delay escalation; QC reject alert; low stock notification; credit-hold alert; packing-ready notification; unpaid invoice reminder; overdue sample reminder; daily exception digest.

### AI મદદ — core data વિશ્વસનીય થયા પછી

WhatsApp order draft, Gujarati/Hindi voice-to-draft, bill/challan extraction, catalogue description, follow-up draft, natural-language business questions અને similar-product suggestions.

AI answerમાં report/date range/linked records બતાવવા. Role પ્રમાણે જ data access; arbitrary SQL કે unrestricted customer data AIને ન આપવો. Imported messages/documentsને સૂચનાઓ નહીં, untrusted business data ગણવું.

Forecasting માટે historical sales સાથે returns, stock-outs, seasonality અને incomplete data ધ્યાનમાં લેવાં. પૂરતા history વગર ચોક્કસ demand prediction અથવા guaranteed profitનો દાવો નહીં. Reorder અને credit decisions માટે human approval રાખવો.

## 18. વપરાશકર્તા અને UX

| Role | મુખ્ય કામ અને મર્યાદા |
|---|---|
| Owner/Admin | Company settings, margins, approvals, audit, reports |
| Purchase/Production | Supplier, PO, job stages, materials, due dates |
| QC/Store | Inward, inspection, location, count, authorised movements |
| Sales | Assigned customers, approved prices, orders, follow-ups; purchase cost મૂળભૂત રીતે hidden |
| Dispatch | Pick/pack, cartons, shipment; price/stock overrides નહીં |
| Accounts | Receipts, allocations, vendor bills, credit notes, exports |
| Vendor portal | માત્ર પોતાના jobs અને update requests; company customer list નહીં |
| Customer/Agent portal | માત્ર પોતાના અથવા explicitly assigned records |

એક માણસ પાસે એકથી વધુ roles હોઈ શકે. Maker-checker rules મહત્વના rates, discounts, stock write-offs અને finance reversals માટે.

Desktopમાં tables અને keyboard-friendly entry; mobileમાં photo cards, camera upload, scan અને મોટા action buttons. Gujarati/Hindi labels સાથે જરૂરી English business terms. Global searchમાં design code, phone, party, invoice અને LR શોધી શકાય.

PWA દ્વારા home-screen install અને app-like web experience આપી શકાય; browser/device પ્રમાણે features બદલાય. [S6] Weak-network સ્થિતિમાં local draft ચાલે, પણ actual stock reservation, final invoice અને payment posting online server validation પછી જ. Offline draftsને confirmed data જેવો badge નહીં.

## 19. સૂચિત તકનીકી માળખું

| ભાગ | સૂચિત પસંદગી/નિર્ણય |
|---|---|
| Frontend | Next.js + TypeScript, responsive web/PWA |
| Backend | TypeScript service layer; શરૂઆતમાં modular monolith, સ્પષ્ટ inventory/order/finance modules |
| Database | PostgreSQLને authoritative transactional store |
| Auth/access | Managed authentication, server-side permissions, branch/tenant scoping |
| Files | Private object storage; approved public catalogue assets અલગ |
| Workers | Durable job queue અને transactional outboxથી notifications, catalogue processing અને integrations |
| Redis | જરૂરી થાય ત્યારે queue/cache માટે; financial/stock truth તરીકે નહીં |
| Integrations | Official WhatsApp; authorised accounting/GST/transporter adapters |
| Environments | Development, staging અને production અલગ |

આ પસંદગી પ્રસ્તાવ છે; ચોક્કસ versions અને hosting provider implementation વખતે current docs, volume અને budget સામે ચકાસવાના. શરૂઆતમાં microservices, native mobile apps અને અલગ analytics warehouseથી અનાવશ્યક complexity ન વધારવી.

Multi-company product બનાવવાનો સંભાવિત હેતુ હોય તો tenant isolation શરૂઆતથી schemaમાં રાખવું, ભલે pilot એક કંપનીનો હોય. `tenant_id` માત્ર field તરીકે પૂરતું નથી: દરેક API, join, export, file access અને background job tenant-scoped; cross-tenant relationships અટકાવતા constraints. PostgreSQL/Supabase RLS database-level access policies માટે ઉપયોગી છે, પણ યોગ્ય policies અને tests ફરજિયાત છે. [S8]

Secrets server-side; role change પછી session access update; owner/accounts માટે MFA; permission-aware export; private document signed access; upload validation; encrypted transport; sensitive action audit; data retention અને consent configuration.

Performance માટે expected products/SKUs, monthly order lines, daily messages, media GB અને simultaneous staff માપવા. User count માત્રથી server નક્કી ન કરવો. Indexes, pagination, connection pooling, thumbnail generation અને bulk jobsનો ઉપયોગ કરવો; load test પછી જ hardware sizing.

## 20. તબક્કાવાર વિકાસ

| તબક્કો | મુખ્ય deliverables | બહાર નીકળવાની શરત |
|---|---|---|
| A — Process validation | Actual PO, challan, sample, sales order, invoice અને Excel mapping; unit/pack/approval rules | Owners અને accountant દ્વારા approved workflow અને field dictionary |
| B — End-to-end MVP | Login/roles, designs, parties, PO, basic job-work, QC, stock, manual catalogue sharing, order, reserve, dispatch, invoices/receipts, returns, basic costing | એક ખરીદી/જોબથી એક sale અને collection સુધી પૂર્ણ linked cycle; must-pass tests સફળ |
| C — Pilot અને controls | Real opening data, barcode, training, audit/backup verification, reconciliation, migration fixes | Store અને accounts stock/ledger totals સ્વીકારે; authorised live pilot |
| D — Automation અને portals | Official WhatsApp inbox/templates, customer/vendor portals, accounting/carrier integrations, commission | Retry, duplicate protection, permissions અને operational ownership tests સફળ |
| E — Advanced product | Forecasting, image similarity, capacity planning, more branches/tenants, SaaS billing | વિશ્વસનીય history, સ્પષ્ટ ઉપયોગ અને માપી શકાય એવો business benefit |

Audit trail, role checks અને backup design MVPથી જ હોવા જોઈએ; પાઇલટમાં તેમના વાસ્તવિક ઉપયોગ અને restoreની ચકાસણી કરવી. દરેક તબક્કો calendarના અંદાજથી નહીં, acceptance criteriaથી પૂર્ણ ગણવો. Required GST capability અને data protection જેવી બાબતો સંબંધિત કંપની માટે go-live prerequisite છે; feature roadmapનો બહાનો નથી.

MVPમાં ઓછા screens હોવા છતાં આખી processનો એક વાસ્તવિક cycle ચાલવો જોઈએ. માત્ર dashboard અને CRUD formsને complete product ન ગણવો.

## 21. Excelથી સ્થળાંતર અને staff adoption

પહેલેથી Excel-heavy workflow હોવાથી import templates મૂળભૂત feature રહે: items/SKUs, parties, opening stock by location/lot, open PO/jobs, open sales orders, invoice-level receivables/payables, advances અને consent evidence.

Import પહેલાં duplicate-name/mobile/GSTIN checks, missing required fields, unit mismatch, invalid dates અને inconsistent totalsનો preview. Import batch ID અને rejected-row report; retryથી duplicate records નહીં.

પહેલા નાના representative datasetથી rehearsal. Cut-over સમયે physical stock count અને accountant-approved balances; open documentsની mapping. Opening inventory અને જૂની purchase receipt બંને પોસ્ટ કરીને double stock બનાવવો નહીં. Unknown costsને zero-profit તરીકે છુપાવવાને બદલે provisional રાખવા.

મર્યાદિત pilot દરમિયાન જૂના અને નવા totals સરખાવવા. અંતે clear cut-over પછી નવી entryનું એક જ authoritative system. Trainingમાં role મુજબ રોજના 3–5 મુખ્ય કામ; vendor પર જટિલ loginનો બોજ મૂકવાને બદલે સરળ update flow.

## 22. ગણિત સાથેનું અંતથી અંત ઉદાહરણ

આ ઉદાહરણ કલ્પિત છે. માત્ર process સમજાવવા માટે GST, freight અને commission ગણ્યા નથી; actual softwareમાં લાગુ amounts ઉમેરવાના.

1. `LH-101`ના approved sample પરથી 4 colours × 25 sets = 100 setsનો PO.
2. Final accepted landed cost પ્રતિ set ₹1,800; બધા 100 sets QC pass. Stock value ₹1,80,000.
3. Digital catalogue ગ્રાહકને મોકલ્યો; આથી physical stock બદલાતો નથી.
4. ગ્રાહકે 40 sets પ્રતિ ₹2,400 ઓર્ડર કર્યા. Order value ₹96,000, પરંતુ આ હજી આખું invoiced sales નથી.
5. 40 sets reserve: physical stock 100, reserved 40, immediately available 60.
6. પ્રથમ dispatch/invoice 25 sets: physical stock 75, remaining reservation 15, available 60; pending delivery 15.
7. આ invoiceનું net sales ₹60,000, sold-goods cost ₹45,000, gross profit ₹15,000; gross margin 25%.
8. અગાઉ આવેલું ₹30,000 cleared advance આ invoice સામે allocate કરીએ તો invoiceનું remaining outstanding ₹30,000. આ ઉદાહરણમાં અલગથી GST ગણાયેલું નથી.
9. બાકી 15 sets dispatch થયા પછી બાકીની invoice અને allocation. Order, dispatch, stock અને collectionની સ્થિતિ અલગથી સ્પષ્ટ રહે.

જો આ દરમિયાન બે physical samples બહાર મોકલાય તો 2 sets sample locationમાં જશે; warehouse available stock વધુ 2થી ઘટશે. Samples company-owned હોય તો કુલ owned quantityમાં રહેશે, સામાન્ય saleable stockમાં નહીં.

## 23. લોન્ચ પહેલાં ફરજિયાત પરીક્ષણ

| પરીક્ષણ | સ્વીકાર્ય પરિણામ |
|---|---|
| છેલ્લો 1 set બે salespeople સાથે reserve કરે | ફક્ત એક reservation સફળ; બીજાને stock unavailable |
| એ જ WhatsApp/webhook/import બે વખત આવે | એક જ business record; duplicate reconciliation visible |
| 100 pieces receiptમાં 90 accepted, 5 rework, 5 rejected | સામાન્ય વેચાણ માટે માત્ર 90; બાકી 10નું અલગ status/location |
| 40નો order, 25નો dispatch | 15 pending અને reserved; inventoryમાં ફક્ત 25 dispatch effect |
| એક setનો દુપટ્ટો missing | Complete set તરીકે pick/dispatch નહીં, authorised exception વિના |
| Job input બે vendorsમાં split | company-owned quantity અને vendor-wise balance reconcile |
| Discount/credit limit override | authorised role, reason અને audit વગર મંજૂરી નહીં |
| Return આવે | receipt/QC પછી જ stock availability; credit અને physical movement બંને linked |
| Sales user costing URL/export ખોલે | server-side access denied; UI hide પૂરતું નહીં |
| બીજી company/ગ્રાહકની ID બદલી access કરે | record, export અને files સુધી access blocked |
| Internet તૂટે પછી submit retry | duplicate stock/payment posting નહીં; draft અને confirmed સ્થિતિ સ્પષ્ટ |
| WhatsApp/GST/accounting API fail થાય | failure queue અને retry; required legal gate bypass નહીં |
| Payment screenshot upload થાય | verified payment આપોઆપ નહીં |
| Backup restore drill | database, files અને relevant state પુનઃસ્થાપિત કરી totals ચકાસાય |
| Posted invoice/stock entry બદલવી પડે | approved reversal/amendment; history ગુમ ન થાય |

## 24. અહેવાલો અને સફળતાનું માપન

Design-wise net units/net sales/gross profit; lot/shade stock; aging inventory; vendor pending and accepted-on-time rate; QC rejection/rework; sample return; quotation-to-order conversion; fill rate; partial dispatch; customer aging; salesperson/agent collection; margins by customer/order; campaign-attributed enquiries/orders જ્યાં evidence હોય.

Business success માટે rollout પહેલાં baseline માપવું: order entryનો સમય, stock mismatch, missed dispatch, overdue invoice value, sample loss, duplicate entry અને collection follow-upમાં લાગતો સમય. Pilot પછી એ જ પરિભાષાથી સરખાવવું; પહેલાંથી બચત અથવા ROIની ખાતરી ન આપવી.

માસિક operating budgetમાં app/database hosting, media storage/transfer, backups, monitoring, WhatsApp usage/provider charges, AI usage, notifications અને support અલગ રાખવા. Companyનું actual volume અને support scope વિના fixed infrastructure bill અથવા development quotation ન ગણવું.

## 25. Developer handoff — મુખ્ય entities અને invariant

### Entity groups

- Organisation: tenants, companies, branches, users, roles, permission grants.
- Master data: parties, addresses, items/designs, design_versions, SKUs, units, kit_components, pack_components, price_lists, tax_rules, warehouses/locations.
- Procurement: purchase_orders/lines, supplier_quotes, supplier_bills/lines, goods_receipts/lines.
- Production: BOM_versions, job_orders, job_stages, material_issues/lines, stage_transfers, consumption, outputs, rework, scrap.
- Quality/inventory: lots, inspections/lines, stock_ledger_entries, stock_balance_projection, reservations, stock_counts, adjustment_approvals.
- Sales: enquiries, quotations/lines, sales_orders/lines, order_allocations, invoices/lines, shipment_lines, cartons, dispatches, delivery_proofs.
- Finance: receipts, payments, invoice_allocations, advances, credit_notes, debit_notes, refunds, commission_entries.
- Engagement: sample_movements, catalogues/items, access_grants, customer_consents, conversations/messages, campaigns/recipients.
- System: attachments, audit_events, approval_requests, import_batches, outbox_events, integration_attempts, idempotency_keys.

આ સૂચિત logical model છે; સીધી રીતે દરેક નામ માટે table બનાવવો જરૂરી નથી. Data dictionary અને transaction boundaries સાથે schema review પછી અંતિમ normalisation કરવું.

### Invariants

Quantity units consistent; money માટે exact decimal/minor units અને approved rounding; no silent negative stock; reservation exceeds saleable quantity નહીં; original posting immutable; approval at line/version level; company-scoped document numbering; cross-tenant foreign keys blocked; one external event → one posting; finite authorised state transitions.

### Integration processing

Business transaction commit અને outgoing event એક જ database transactionમાં persist કરવા. Worker committed events વાંચે, external request કરે અને attempt/result store કરે. External provider callને stock transactionના લાંબા lockની અંદર રાખવો નહીં. Retry, idempotency અને manual reconciliationથી consistency જાળવવી.

### Backup and recovery

સૂચિત planning targets: recoverable data-loss window મહત્તમ 1 કલાક, restore target 4 કલાક—આ targets છે, હાંસલ થયેલી SLA નથી. Hosting, database backup/PITR, attachment backup, credentials અને restore drill વિના આવા targets claim કરવા નહીં. Companyની operational need મુજબ targets મંજૂર/બદલવા.

## 26. Implementation પહેલાં ચકાસવાના મુદ્દા — હાલના પ્લાન માટે અવરોધ નહીં

એક કે અનેક companies/branches; existing accounting package; actual SKU/lot/order volume; finished purchase સામે own-material job-workનું પ્રમાણ; approved stock valuation; full-pack સામે loose sales; credit policy; sample deposit/return policy; transport modes; tax applicability; WhatsApp account/onboarding status; staff roles અને approval limits.

આ જવાબો મળ્યા પછી fields અને phase boundaries fine-tune થશે. પરંતુ હાલની ભલામણ સ્પષ્ટ છે: **સેમ્પલ + ખાતા/જોબવર્ક + QC + સાચો સ્ટોક + ઓર્ડર + ડિસ્પેચ + પેમેન્ટનો વિશ્વસનીય જોડાયેલો પાયો પહેલાં; AI અને મોટા marketing automation પછી.**

## ચકાસેલા સ્રોત

નીચેના સ્રોત platform capabilities અને compliance architecture માટે છે. Companyના workflow, screens, phases, formulasના ઉપયોગ અને controls આ દસ્તાવેજની સૂચિત ડિઝાઇન છે. દસ્તાવેજ તૈયાર કરતી વખતે 2 ઑક્ટોબર 2026એ તપાસેલા જાહેર પાનાં; implementation/go-live સમયે લાગુ શરતો ફરી ચકાસવી.

- S1 — WhatsApp Business Messaging Policy: https://business.whatsapp.com/policy
- S2 — CBIC, CGST Rule 45, job-work movement: https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter5/rule45_v1.00.html
- S3 — GST e-Invoice system અને notifications: https://einvoice1.gst.gov.in/ ; https://einvoice1.gst.gov.in/Others/Notifications
- S4 — E-Way Bill official FAQ, movement documents અને job-work exceptions: https://docs.ewaybillgst.gov.in/html/faq.html
- S5 — TallyPrime official integration/XML guidance: https://help.tallysolutions.com/integrate-with-tallyprime/ ; https://help.tallysolutions.com/xml-integration/
- S6 — Next.js, Progressive Web Applications: https://nextjs.org/docs/app/guides/progressive-web-apps
- S7 — PostgreSQL, Explicit Locking: https://www.postgresql.org/docs/current/explicit-locking.html
- S8 — Supabase/PostgreSQL Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security

નોંધ: ઉપરના કાનૂની સ્રોતોની ચોક્કસ effective dates અને company-specific applicability accountant દ્વારા verify કરવી. આ દસ્તાવેજમાં GST rate, turnover threshold, e-way distance validity કે filing deadline hard-code કરેલી નથી.
