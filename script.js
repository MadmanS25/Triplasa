async function updateJSON() {
    const token = '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';  // replace with your actual token
    const repo = 'MadmanS25/Triplasa';  // replace with your actual repo name
    const path = 'main/roter.json';  // replace with the actual path to your JSON file
    const branch = 'main';  // replace with the branch name you want to update

    // Step 1: Fetch the current content of the JSON file (to get the SHA)
    const fileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
    const fileData = await fileResponse.json();

    // Step 2: Modify the content of the JSON file from {"clicked": "false"} to {"clicked": "true"}
    let jsonContent = atob(fileData.content); // Decode the base64 content
    let updatedJSON = JSON.parse(jsonContent); // Parse the JSON content
    updatedJSON.clicked = "true";  // Change clicked value to true
    const updatedContent = btoa(JSON.stringify(updatedJSON, null, 2));  // Encode the updated content in base64

    // Step 3: Commit the changes using GitHub API
    const updateResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update JSON clicked to true',
            content: updatedContent,
            sha: fileData.sha,  // Use the SHA from the original file to reference the correct file version
            branch: branch
        })
    });

    // Step 4: Check if the update was successful
    if (updateResponse.ok) {
        console.log('JSON file updated successfully!');
    } else {
        console.error('Failed to update the JSON file.');
    }
}
