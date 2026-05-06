## ADDED Requirements

### Requirement: Responsive EDM product page
The system SHALL render the product page as an EDM-first page using `edm.jpg` as the primary and only product-page visual content.

#### Scenario: Desktop product page layout
- **WHEN** a visitor opens the product page on a desktop viewport
- **THEN** the system displays `edm.jpg` at a comfortable readable width with horizontal whitespace and automatic height preservation

#### Scenario: Mobile product page layout
- **WHEN** a visitor opens the product page on a mobile viewport
- **THEN** the system displays `edm.jpg` at the full viewport width with automatic height preservation

#### Scenario: Product page excludes logo
- **WHEN** a visitor opens the product page
- **THEN** the system does not display `logo.jpg` or additional branded header content on that page

### Requirement: EDM image navigates to checkout
The system SHALL navigate visitors from the product page to the checkout page when they activate the EDM image.

#### Scenario: Click EDM image
- **WHEN** a visitor clicks or taps the EDM image on the product page
- **THEN** the system opens the checkout page

#### Scenario: Keyboard activation
- **WHEN** a visitor focuses the EDM image link and activates it with the keyboard
- **THEN** the system opens the checkout page