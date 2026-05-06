## MODIFIED Requirements

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

## ADDED Requirements

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