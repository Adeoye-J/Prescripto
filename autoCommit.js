const { exec } = require("child_process");

// Commit message with the current date and time
const commitMessage = `Auto commit at ${new Date().toLocaleString()}`;

// Function to run Git commands
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

// Main function to handle add, commit, and push
const autoCommit = async () => {
  try {
    console.log("Starting automated commit...");

    await runCommand("git add .");
    console.log("✅ Files added to Git.");

    await runCommand(`git commit -m "${commitMessage}"`);
    console.log("✅ Files committed to Git.");

    await runCommand("git push origin main");
    console.log("🚀 Files pushed to GitHub successfully!");

  } catch (err) {
    console.error("❌ Error during Git automation:", err);
  }
};

autoCommit();
