# Product EDM Page Specification

## Purpose
Define the EDM-first product landing page, supplemental store information, and navigation into checkout.

## Requirements

### Requirement: Responsive EDM product page
The system SHALL render the product page as an EDM-first page using `edm.jpg` as the primary product visual, followed by one supplemental store information section that combines contact and location content.

#### Scenario: Desktop product page layout
- **WHEN** a visitor opens the product page on a desktop viewport
- **THEN** the system displays `edm.jpg` at a comfortable readable width with horizontal whitespace and automatic height preservation
- **AND** the system displays the consolidated store information section below the EDM content

#### Scenario: Mobile product page layout
- **WHEN** a visitor opens the product page on a mobile viewport
- **THEN** the system displays `edm.jpg` at the full viewport width with automatic height preservation
- **AND** the system displays the consolidated store information section below the EDM content in a stacked readable layout

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

### Requirement: EDM store information section
The system SHALL display one consolidated store information section below the EDM with store contact, ordering, and location information.

#### Scenario: Store details are visible
- **WHEN** a visitor scrolls below the EDM content
- **THEN** the system displays the store name, address, phone number, certification text, service types, and LINE contact guidance

#### Scenario: Immediate ordering actions are available
- **WHEN** a visitor views the store information section
- **THEN** the system displays a phone action for `24235111`
- **AND** the system displays a LINE inquiry action or guidance for adding the store on LINE

#### Scenario: Map-style location appears
- **WHEN** a visitor views the store information section
- **THEN** the system displays a Google Maps-like map area focused on the store location at `基隆市愛二路60號`

#### Scenario: Map content is unavailable
- **WHEN** the embedded map content cannot load
- **THEN** the section still displays the store location label

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