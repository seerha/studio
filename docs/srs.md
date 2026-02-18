# Software Requirements Specification (SRS)
## Project: GovBook Portal - Vikas Bhawan Complex Auditorium

### 1. Introduction
The GovBook Portal is the official digital gateway for the allotment and management of the 750-seater auditorium at the Vikas Bhawan Complex, Sector-62, SAS Nagar. Operated by the Department of Rural Development & Panchayats, Punjab, this system ensures transparent, secure, and policy-compliant booking as per the statutory mandate (Sections 1-15).

---

### 2. User Roles & Personas
*   **Public Visitor**: Any person accessing the portal to view the Master Availability Calendar, Guidelines, and Tariff Card.
*   **Registered Requester**: Verified organizational representatives (Govt/NGO/Private) authorized to submit allotment proposals.
*   **Approving Authority (Admin)**: Level-II officers responsible for reviewing proposals, managing state overrides, and revoking allotments for official exigencies.

---

### 3. Functional Requirements

#### 3.1 Identity & Verification (FR1)
*   **Aadhar Validation**: System must collect and validate a 12-digit UIDAI Aadhar number for every proposal.
*   **Mobile Verification**: Proposals require a valid 10-digit Indian mobile number linked to the representative.
*   **Organization Proof**: Requesters must upload departmental proof (Official Letterhead, NGO Registration, or GST Certificate).

#### 3.2 Master Availability Management (FR2)
*   **Shift-Based Slots**: The system partitions each day into two distinct shifts:
    *   **Slot 1 (Morning/Noon)**: 09:00 AM – 02:00 PM.
    *   **Slot 2 (Evening)**: 05:00 PM – 10:00 PM.
*   **Real-time Status**: Calendar must display slots as **Available**, **Awaiting Approval** (Pending), or **Confirmed Allotment** (Booked).
*   **Lockout Period**: Dates within 30 days of the current date are locked for official review (Section 1.1).

#### 3.3 Allotment Proposals & Surcharges (FR3)
*   **Nature of Event**: Proposals must select from permitted categories (Govt Functions, Conferences, Cultural Shows, etc.).
*   **Tiered Rent**: Base rent is calculated by requester category:
    *   Category A (Govt): ₹5,000
    *   Category B (NGO): ₹15,000
    *   Category C (Private): ₹50,000
*   **Surcharges**:
    *   Collaboration: 10% rent surcharge (Section 14.4).
    *   Sponsor Standees: ₹2,000 per unit (Max size 6'x3').

#### 3.4 Administrative Control Center (FR4)
*   **State Override**: Ability to block entire days for "Emergency Visits" or "Government Exigency" (Section 13.1).
*   **Revocation**: Authority to cancel any confirmed booking with automated status updates.

---

### 4. Non-Functional Requirements
*   **Security**: All write operations are protected by Firestore Security Rules. Identity verification (Aadhar) is mandatory for submission.
*   **Accessibility**: UI must include screen-reader support (Aria labels/titles) and high-contrast styling using the official State colors (Blue/Gold).
*   **Persistence**: All proposals, blocks, and user profiles must be persisted in a real-time Firestore database.

---

### 5. Statutory Business Rules (Extracts)
*   **Section 1.1**: Minimum 30 days advance booking required.
*   **Section 8.1**: Max seating capacity is strictly 750 persons.
*   **Section 11.8**: Catering is strictly prohibited inside the hall.
*   **Section 13.2**: User cancellations result in 100% forfeiture of all fees.
*   **Section 14.6**: Misrepresentation of category or identity results in immediate cancellation.

---

### 6. Data Schema
*   **Users**: Profile data, verified role, category, and departmental affiliation.
*   **Bookings**: Reference ID, slot details, event nature, calculated financial quote, and status (Pending/Approved/Confirmed/Cancelled).
*   **BlockedDates**: Administrative overrides for official maintenance or VVIP visits.
