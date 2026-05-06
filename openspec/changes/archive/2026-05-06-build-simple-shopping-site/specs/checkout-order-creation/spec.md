## ADDED Requirements

### Requirement: Checkout captures customer information
The system SHALL provide a checkout form that collects customer information required to create an order.

#### Scenario: Required customer fields are completed
- **WHEN** a customer enters name, phone number, and shipping address on the checkout page
- **THEN** the system accepts the customer information for order creation

#### Scenario: Required customer fields are missing
- **WHEN** a customer attempts to create an order without name, phone number, or shipping address
- **THEN** the system prevents order creation and displays field-level validation feedback

#### Scenario: Optional customer details are entered
- **WHEN** a customer enters optional email or order note information
- **THEN** the system stores those details with the order

### Requirement: Checkout displays configurable transfer information
The system SHALL display bank transfer information on the checkout page using environment-configured values.

#### Scenario: Transfer information is configured
- **WHEN** bank name, branch, account name, account number, and product total amount are configured in environment variables
- **THEN** the checkout page displays those values to the customer before order creation

#### Scenario: Transfer information changes in configuration
- **WHEN** the transfer-related environment variables are changed and the app is restarted or redeployed
- **THEN** the checkout page displays the updated transfer information without source code edits

### Requirement: Checkout displays product order summary
The system SHALL display a shopping-mall style product summary on the checkout page with product information, unit price, quantity, subtotal, and total amount.

#### Scenario: Checkout page shows product details
- **WHEN** a customer opens the checkout page
- **THEN** the system displays the configured product name, product description, unit price, quantity, subtotal, and total amount before order creation

#### Scenario: Customer changes quantity
- **WHEN** a customer increases or decreases the product quantity on the checkout page
- **THEN** the system updates the subtotal and total amount based on the configured unit price and selected quantity

### Requirement: Checkout collects account last five digits
The system SHALL provide an input after the transfer information for the customer to enter the last five digits of the transfer account.

#### Scenario: Valid last five digits are entered
- **WHEN** a customer enters exactly five numeric digits in the account-last-five input
- **THEN** the system accepts the value for payment reconciliation

#### Scenario: Invalid last five digits are entered
- **WHEN** a customer enters fewer than five digits, more than five digits, or non-numeric characters
- **THEN** the system prevents order creation and displays validation feedback

### Requirement: Checkout creates persisted order
The system SHALL create a persisted order when the checkout form is valid and the customer presses the create order button.

#### Scenario: Valid checkout submission creates order
- **WHEN** a customer submits valid customer details and valid account last five digits
- **THEN** the system creates an order with a unique order number, product name, unit price, selected quantity, computed total amount, customer details, account last five digits, and initial status `訂單成立`

#### Scenario: Order creation succeeds
- **WHEN** the system successfully persists the order
- **THEN** the customer is redirected to the order confirmation page for that order

#### Scenario: Order creation fails
- **WHEN** the system cannot persist the order
- **THEN** the checkout page keeps the entered form data and displays a recoverable error message

### Requirement: Checkout includes logo branding
The system SHALL display `logo.jpg` on the checkout page without obscuring the checkout form or transfer details.

#### Scenario: Customer views checkout page
- **WHEN** a customer opens the checkout page
- **THEN** the system displays the logo in a consistent page header or brand area