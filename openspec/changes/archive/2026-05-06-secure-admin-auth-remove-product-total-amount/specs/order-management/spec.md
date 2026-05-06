## MODIFIED Requirements

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