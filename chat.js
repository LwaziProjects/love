// Chat Functionality with Supabase (FREE real-time database)
let currentChatId = null;
let currentUserName = null;
let subscription = null;
let loadedMessageIds = new Set();

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;

    initializeChat();
});

// Initialize chat with unique room ID
function initializeChat() {
    try {
        const params = new URLSearchParams(window.location.search);
        currentChatId = params.get('chat') || generateChatId();
        currentUserName = localStorage.getItem('userName') || null;

        // Update URL with chat ID
        if (!params.get('chat')) {
            const newUrl = `${window.location.pathname}?chat=${currentChatId}`;
            window.history.replaceState({}, '', newUrl);
        }

        // Update chat room display
        const roomIdEl = document.getElementById('chatRoomId');
        if (roomIdEl) {
            roomIdEl.textContent = currentChatId;
        }

        const chatLinkInput = document.getElementById('chatLink');
        if (chatLinkInput) {
            chatLinkInput.value = `${window.location.origin}${window.location.pathname}?chat=${currentChatId}`;
        }

        // Check if Supabase is configured and loaded
        if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.includes('supabase.co')) {
            initializeSupabaseChat();
        } else {
            console.log('Supabase not available, using localStorage');
            initializeLocalChat();
        }
    } catch (e) {
        console.error('Chat initialization error:', e);
        initializeLocalChat();
    }
}

// Supabase initialization (free real-time chat)
function initializeSupabaseChat() {
    try {
        // Create Supabase client
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        if (!window.supabaseClient) {
            console.log('Supabase client creation failed');
            initializeLocalChat();
            return;
        }

        console.log('Supabase initialized successfully');
        loadSupabaseMessages();
        subscribeToSupabaseMessages();
    } catch (e) {
        console.error('Supabase initialization error:', e);
        initializeLocalChat();
    }
}

// Load existing messages from Supabase
async function loadSupabaseMessages() {
    if (!window.supabaseClient) return;
    
    try {
        const { data, error } = await window.supabaseClient
            .from('chat')
            .select('*')
            .eq('room_id', currentChatId)
            .order('timestamp', { ascending: true });

        if (error) {
            console.log('Error loading messages:', error);
            return;
        }

        if (data) {
            data.forEach(msg => {
                displayMessage({
                    id: msg.id,
                    sender: msg.sender,
                    text: msg.text,
                    timestamp: new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                });
                loadedMessageIds.add(msg.id);
            });
        }
    } catch (e) {
        console.error('Load messages error:', e);
    }
}

// Subscribe to new messages in real-time
function subscribeToSupabaseMessages() {
    if (!window.supabaseClient) return;

    try {
        subscription = window.supabaseClient
            .channel(`room:${currentChatId}`)
            .on('postgres_changes', 
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'chat',
                    filter: `room_id=eq.${currentChatId}`
                },
                (payload) => {
                    const msg = payload.new;
                    if (!loadedMessageIds.has(msg.id)) {
                        displayMessage({
                            id: msg.id,
                            sender: msg.sender,
                            text: msg.text,
                            timestamp: new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                        });
                        loadedMessageIds.add(msg.id);
                    }
                }
            )
            .subscribe();
        console.log('Subscribed to chat messages');
    } catch (e) {
        console.error('Subscription error:', e);
    }
}

// Initialize chat using localStorage (fallback when Supabase not configured)
function initializeLocalChat() {
    console.log('Using localStorage for chat');
    const storageKey = `chat_${currentChatId}`;
    
    // Load existing messages
    const existingMessages = localStorage.getItem(storageKey);
    if (existingMessages) {
        try {
            const messages = JSON.parse(existingMessages);
            messages.forEach(msg => displayMessage(msg));
        } catch (e) {
            console.log('No previous messages');
        }
    }

    // Check for new messages every second
    setInterval(() => {
        try {
            const messages = JSON.parse(localStorage.getItem(storageKey) || '[]');
            const chatMessages = document.querySelectorAll('.chat-message');
            if (messages.length > chatMessages.length) {
                messages.slice(chatMessages.length).forEach(msg => displayMessage(msg));
            }
        } catch (e) {
            // Ignore parse errors
        }
    }, 1000);
}

// Generate unique chat room ID
function generateChatId() {
    return 'chat_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Send message
async function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;

    const message = input.value.trim();
    
    if (!message) return;

    // Get user name
    let userName = currentUserName;
    if (!userName) {
        userName = prompt('What should I call you? 💕');
        if (!userName) return;
        currentUserName = userName;
        localStorage.setItem('userName', userName);
    }

    const messageObj = {
        id: Date.now().toString(),
        sender: userName,
        text: message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    // Try to save to Supabase first
    if (window.supabaseClient) {
        try {
            const { error } = await window.supabaseClient
                .from('chat')
                .insert([{
                    room_id: currentChatId,
                    sender: userName,
                    text: message
                }]);

            if (!error) {
                // Message will appear via subscription
                input.value = '';
                input.focus();
                return;
            }
        } catch (e) {
            console.log('Supabase insert error, using localStorage:', e);
        }
    }

    // Fallback to localStorage
    const storageKey = `chat_${currentChatId}`;
    const messages = JSON.parse(localStorage.getItem(storageKey) || '[]');
    messages.push(messageObj);
    localStorage.setItem(storageKey, JSON.stringify(messages));

    // Display message
    displayMessage(messageObj);
    
    // Clear input
    input.value = '';
    input.focus();

    // Scroll to bottom
    const messagesContainer = document.getElementById('chatMessages');
    if (messagesContainer) {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
}

// Display a message in chat
function displayMessage(messageObj) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    // Check if message already exists
    if (document.querySelector(`[data-message-id="${messageObj.id}"]`)) {
        return;
    }

    // Remove welcome message if first message
    const welcome = document.querySelector('.chat-welcome');
    if (welcome && container.children.length === 1) {
        welcome.remove();
    }

    const messageEl = document.createElement('div');
    messageEl.className = messageObj.sender === currentUserName ? 'chat-message sent' : 'chat-message received';
    messageEl.setAttribute('data-message-id', messageObj.id);
    messageEl.innerHTML = `
        <div class="message-content">
            <div class="message-sender">${escapeHtml(messageObj.sender)}</div>
            <div class="message-text">${escapeHtml(messageObj.text)}</div>
            <div class="message-time">${messageObj.timestamp}</div>
        </div>
    `;
    
    container.appendChild(messageEl);
    
    // Auto-scroll to bottom
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Copy link to clipboard
function copyShareLink() {
    const input = document.getElementById('chatLink');
    if (!input) return;

    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

// Enable Enter key to send message
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
