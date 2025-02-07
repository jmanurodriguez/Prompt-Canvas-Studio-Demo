interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  expertise: string[];
  followers: string[];
  following: string[];
  contributions: number;
  joinedDate: Date;
}

interface SocialInteraction {
  type: 'like' | 'save' | 'share' | 'comment';
  userId: string;
  targetId: string;
  timestamp: Date;
  metadata?: any;
}

interface Feed {
  items: (Prompt | Comment | Activity)[];
  cursor: string;
  hasMore: boolean;
} 