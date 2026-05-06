## ADDED Requirements

### Requirement: Confirmation displays order number
The system SHALL display the generated order number prominently on the order confirmation page.

#### Scenario: Customer reaches confirmation after checkout
- **WHEN** a customer is redirected to the order confirmation page after successful order creation
- **THEN** the system displays the order number for customer reference and owner reconciliation

### Requirement: Confirmation displays submitted customer information
The system SHALL display the submitted customer information and order summary on the order confirmation page.

#### Scenario: Confirmation page loads persisted order
- **WHEN** the order confirmation page loads for an existing order
- **THEN** the system displays customer name, phone number, shipping address, optional email, optional note, product name, unit price, quantity, total amount, account last five digits, and current order status

#### Scenario: Confirmation page receives unknown order
- **WHEN** the order confirmation page is opened with an unknown or deleted order identifier
- **THEN** the system displays a clear not-found state instead of another customer's information

### Requirement: Confirmation includes logo branding
The system SHALL display `logo.jpg` on the order confirmation page.

#### Scenario: Customer views confirmation page
- **WHEN** a customer opens the order confirmation page
- **THEN** the system displays the logo in a consistent page header or brand area