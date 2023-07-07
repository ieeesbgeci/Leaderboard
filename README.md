Apologies for the confusion. Here's a readme for the VaderBoard Svelte leaderboard client project:

# VaderBoard Leaderboard

VaderBoard Leaderboard is a web application built with Svelte. It provides a dynamic leaderboard display for user and team events, allowing you to view and track scores in real-time.

![Vaderboard](/assets/vboard.png)

## Demo

![Vaderboard demo](/assets/vboard1.png)

## Installation

To install and run the VaderBoard Leaderboard project, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/v4zha/Vaderboard
   ```

2. Navigate to the project directory:

   ```bash
   cd Vaderboard
   ```

3. Install the dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Access the VaderBoard Leaderboard in your web browser at `http://localhost:5000`.

## Usage

The VaderBoard Leaderboard application allows you to view and interact with the leaderboard for user and team events. Follow the steps below to use the application:

1. Ensure that the [VaderBoard Admin Panel](https://github.com/v4zha/Vaderboard-admin) is running and serving the necessary data for the leaderboard.

2. Open the VaderBoard Leaderboard application in your web browser.

3. If there is an active event, you will see the event details and a button to show or hide the event information.

4. Click on the "Show Event Info" button to display additional information about the event, such as event name, event ID, and event type.

5. The leaderboard table will show the position, name (either user or team name), and score for each participant.

## Customization

You can customize the VaderBoard Leaderboard application to fit your specific requirements. Here are some possible customization options:

- Modify the styling of the components by editing the CSS in the Svelte components or adding your own CSS classes.

- Add additional information or fields to the eventInfo object to display more details about the event.

- Implement additional features, such as filtering or sorting the leaderboard based on different criteria.

- Customize the transition effects or animations for the leaderboard entries.

Feel free to explore the codebase and make changes according to your needs : )
