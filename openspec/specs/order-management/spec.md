# Order Management Specification

## Purpose
Define owner access, order visibility, search, sorting, and editable operational fields for customer orders.

## Requirements

### Requirement: Owner can access order list
The system SHALL provide an owner-facing order list that is protected by server-validated owner access before displaying customer order data, and the configured owner credential MUST NOT be exposed through URLs, hidden form fields, page props, or client-side request payloads after login.

#### Scenario: Owner access is valid
- **WHEN** the owner submits the configured owner credential through the approved login flow
- **THEN** the system establishes server-validated owner access and displays the order list at a URL that does not contain the credential

#### Scenario: Owner access is missing or invalid
- **WHEN** a visitor opens the order list without valid owner access
- **THEN** the system prevents access to customer order data and edit controls

#### Scenario: Owner credential is not carried in client-visible state
- **WHEN** the owner has valid access and uses search, sort, or order update controls
- **THEN** the system performs those actions without rendering the configured owner credential into URLs, hidden inputs, page props, request bodies, or client-side headers

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
The system SHALL allow the owner to update each order's lifecycle status and total amount from the order list only when the request has valid server-validated owner access.

#### Scenario: Update order status
- **WHEN** the owner has valid owner access and changes an order status to an allowed status
- **THEN** the system persists the new status and updates the order's updated time

#### Scenario: Update order total amount
- **WHEN** the owner has valid owner access and edits an order total amount to a valid non-negative amount
- **THEN** the system persists the new total amount and updates the order's updated time

#### Scenario: Invalid order update
- **WHEN** the owner has valid owner access and submits an invalid status or invalid total amount
- **THEN** the system rejects the update and keeps the previous order values

#### Scenario: Unauthorized order update
- **WHEN** a request attempts to update an order without valid owner access
- **THEN** the system rejects the update and keeps the previous order values