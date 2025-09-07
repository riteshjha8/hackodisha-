document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('nav a');
    const viewSections = document.querySelectorAll('.view-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
           
            navLinks.forEach(l => l.classList.remove('active'));
            
           
            this.classList.add('active');
          
          
            viewSections.forEach(section => section.classList.remove('active'));
            
          
            const viewId = this.getAttribute('data-view');
            document.getElementById(viewId).classList.add('active');
        });
    });
    
  
    const video = document.getElementById('lectureVideo');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    playBtn.addEventListener('click', function() {
        video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    });
    
    pauseBtn.addEventListener('click', function() {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
    
    fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
    
   
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const closeChat = document.querySelector('.close-chat');
    
    sendMessage.addEventListener('click', function() {
        sendChatMessage();
    });
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    function sendChatMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
           
            addMessageToChat(message, 'user');
            
        
            messageInput.value = '';
            
           
            setTimeout(function() {
                const aiResponse = generateAIResponse(message);
                addMessageToChat(aiResponse, 'ai');
            }, 1000);
        }
    }
    
    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        
        const messageP = document.createElement('p');
        messageP.textContent = message;
        
        messageDiv.appendChild(messageP);
        chatMessages.appendChild(messageDiv);
        
       
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
 
 
    closeChat.addEventListener('click', function() {
        document.querySelector('.chat-container').style.display = 'none';
    });
    
    
    function generateAIResponse(userMessage) {
        const responses = [
            "Based on the professor's materials, that concept is explained in chapter 3 of your textbook.",
            "The professor covered that topic in the last lecture. Would you like me to summarize it for you?",
            "That's an interesting question. According to the uploaded notes, the answer should be...",
            "I need to consult the professor's materials to give you an accurate answer. One moment please...",
            "That concept is further explained in the video at the 15:30 mark. Would you like me to jump to that section?",
            "Based on the syllabus, we'll cover that in more detail next week.",
            "The professor provided additional resources on that topic in the resources section."
        ];
        
       
        if (userMessage.toLowerCase().includes('syllabus')) {
            return "The syllabus coverage is updated in real-time. Currently, we've completed 65% of the course material.";
        } else if (userMessage.toLowerCase().includes('attendance')) {
            return "Current class attendance is at 84%. You've attended 12 out of 14 lectures so far.";
        } else if (userMessage.toLowerCase().includes('homework') || userMessage.toLowerCase().includes('assignment')) {
            return "The next assignment is due on Friday. Would you like me to show you the details?";
        } else if (userMessage.toLowerCase().includes('thank')) {
            return "You're welcome! Is there anything else I can help with?";
        }
       
       
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
   
    const voiceCommand = document.querySelector('.voice-command');
    const voiceStatus = document.querySelector('.voice-status');
    
    voiceCommand.addEventListener('click', function() {
        voiceStatus.classList.toggle('active');
        
        if (voiceStatus.classList.contains('active')) {
            
            const commands = [
                "What's the attendance for today's class?",
                "How many questions were asked?",
                "What percentage of the syllabus is covered?",
                "Play the lecture video",
                "Pause the lecture video"
            ];
            
            
            setTimeout(function() {
                voiceStatus.innerHTML = `<p>Heard: "${commands[Math.floor(Math.random() * commands.length)]}"</p>`;
            }, 1500);
        }
    });
    

    setTimeout(function() {
        addMessageToChat("I noticed the professor is discussing neural networks. This is covered in depth in the slides on page 24.", 'ai');
    }, 2000);
    
    
    const uploadOptions = document.querySelectorAll('.upload-option');
    uploadOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.querySelector('h4').textContent;
            alert(`Upload ${type} functionality would open here. In a real application, this would allow file upload.`);
        });
    });
    
  
    const doubtForm = document.querySelector('.doubt-form');
    const doubtInput = doubtForm.querySelector('input');
    const doubtButton = doubtForm.querySelector('button');
    
    doubtButton.addEventListener('click', function() {
        const question = doubtInput.value.trim();
        if (question !== '') {
            alert(`Question submitted: "${question}". In a real application, this would be sent to the professor.`);
            doubtInput.value = '';
        }
    });
    
    doubtInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            doubtButton.click();
        }
    });
});
