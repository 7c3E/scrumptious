## MODIFIED Requirements

### Requirement: Checkout displays configurable transfer information
The system SHALL display bank transfer information on the checkout page using environment-configured bank values and the computed order total derived from configured unit price and selected quantity.

#### Scenario: Transfer information is configured
- **WHEN** bank name, branch, account name, account number, and product unit price are configured in environment variables
- **THEN** the checkout page displays those transfer values and the computed total amount to the customer before order creation

#### Scenario: Transfer information changes in configuration
- **WHEN** the transfer-related environment variables or product unit price are changed and the app is restarted or redeployed
- **THEN** the checkout page displays the updated transfer information and recomputed amount without source code edits

### Requirement: Checkout displays product order summary
The system SHALL display a shopping-mall style product summary on the checkout page with product information, unit price, quantity, subtotal, and total amount, with subtotal and total amount computed from the configured unit price and selected quantity.

#### Scenario: Checkout page shows product details
- **WHEN** a customer opens the checkout page
- **THEN** the system displays the configured product name, product description, unit price, quantity, subtotal, and total amount before order creation

#### Scenario: Customer changes quantity
- **WHEN** a customer increases or decreases the product quantity on the checkout page
- **THEN** the system updates the subtotal and total amount based on the configured unit price and selected quantity