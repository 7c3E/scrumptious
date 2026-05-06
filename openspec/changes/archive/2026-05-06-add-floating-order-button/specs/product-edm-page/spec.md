## ADDED Requirements

### Requirement: Floating checkout action
The system SHALL display a playful floating checkout action on the product page that remains available while visitors view the EDM and store information.

#### Scenario: Floating checkout button appears on product page
- **WHEN** a visitor opens the product page
- **THEN** the system displays a floating order button near the right side of the viewport at approximately the upper one-quarter vertical position
- **AND** the button uses playful, cute visual styling while keeping its ordering purpose readable

#### Scenario: Floating checkout button opens checkout
- **WHEN** a visitor clicks or taps the floating order button
- **THEN** the system opens the checkout page

#### Scenario: Keyboard activation opens checkout
- **WHEN** a visitor focuses the floating order button and activates it with the keyboard
- **THEN** the system opens the checkout page

#### Scenario: Floating checkout button remains usable responsively
- **WHEN** a visitor views the product page on desktop or mobile
- **THEN** the floating order button remains visible and usable
- **AND** the button does not obscure essential EDM, store information, contact action, or map content