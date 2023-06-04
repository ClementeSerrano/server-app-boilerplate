# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.4] - 02.06.2023

### Added

- Add new `metadata` field to messages schema in order to enrich responses with places names and maps URLs.

### Changed

- Improve activity chat prompts to only recommend 1 place per request.

## [0.0.3] - 31.05.2023

### Added

- Add new activity-chat mode: Implement the activity chat business logic and API. This allow users to send "topic-based" chat messages to Fixer so it can give them specific recommendations to that topic.

### Changed

- Refactor location geocode and local time services to use Google Maps API.
- Refactor chat responses in order to return conversation objects (more easy to handle in the client apps).

## [0.0.2] - 21.05.2023

### Added

- Include user location, timezone and weather conditions for conversations module (business logic and API).

## [0.0.1] - 14.05.2023

### Added

- Create conversations, users and auth modules models and business logic.
- Create conversations and users DB schemas.
- Create conversations, users and auth modules API (GraphQL schemas + resolvers).
- Setup local and remove MongoDB database.
- Setup app local and remote deployment via Docker.

## [0.0.0] - 2023-05-01

### Added

- Project setup and basic configurations.
