## ADDED Requirements

### Requirement: Owner can access order list
The system SHALL provide an owner-facing order list that is protected by configured owner access before displaying customer order data.

#### Scenario: Owner access is valid
- **WHEN** the owner provides the configured admin access token or equivalent owner credential
- **THEN** the system displays the order list

#### Scenario: Owner access is missing or invalid
- **WHEN** a visitor opens the order list without valid owner access
- **THEN** the system prevents access to customer order data and edit controls

### Requirement: Order list displays customer and order details
The system SHALL display each order with customer information and operational order fields needed for reconciliation.

#### Scenario: Orders exist
- **WHEN** the owner opens the order list and orders exist
- **THEN** the system displays order number, customer name, phone number, address, optional email, optional note, product name, unit price, quantity, account last five digits, total amount, current status, created time, and updated time

#### Scenario: No orders exist
- **WHEN** the owner opens the order list and no orders exist
- **THEN** the system displays an empty state without errors

### Requirement: Owner can search and sort orders
The system SHALL allow the owner to search and sort orders from the order list.

#### Scenario: Search by customer or reconciliation data
- **WHEN** the owner searches by order number, customer name, phone number, address, or account last five digits
- **THEN** the system filters the order list to matching orders

#### Scenario: Sort order list
- **WHEN** the owner changes the sort field or direction
- **THEN** the system reorders the list by created time, updated time, total amount, status, customer name, or order number

### Requirement: Owner can update order status and amount
The system SHALL allow the owner to update each order's lifecycle status and total amount from the order list.

#### Scenario: Update order status
- **WHEN** the owner changes an order status to an allowed status
- **THEN** the system persists the new status and updates the order's updated time

#### Scenario: Update order total amount
- **WHEN** the owner edits an order total amount to a valid non-negative amount
- **THEN** the system persists the new total amount and updates the order's updated time

#### Scenario: Invalid order update
- **WHEN** the owner submits an invalid status or invalid total amount
- **THEN** the system rejects the update and keeps the previous order values