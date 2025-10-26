'use client';

import { useState, useEffect } from 'react';

interface WorkflowStatus {
  workflowId: string;
  status: 'running' | 'completed' | 'failed';
  currentStep?: string;
  steps?: Array<{
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    duration?: number;
  }>;
  result?: any;
  error?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  primary_keyword: string;
  created_at: string;
}

export default function AdminTriggerBlog() {
  const [loading, setLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(null);
  const [message, setMessage] = useState('');
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  // Fetch recent blogs on component mount
  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  // Poll workflow status
  useEffect(() => {
    if (workflowStatus && workflowStatus.status === 'running') {
      const interval = setInterval(() => {
        checkWorkflowStatus(workflowStatus.workflowId);
      }, 3000); // Check every 3 seconds

      return () => clearInterval(interval);
    }
  }, [workflowStatus]);

  const fetchRecentBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const response = await fetch('/api/blogs?limit=10&status=all');
      const data = await response.json();
      setRecentBlogs(data.posts || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const triggerBlogGeneration = async () => {
    try {
      setLoading(true);
      setMessage('Starting blog generation...');
      setWorkflowStatus(null);

      const response = await fetch('/api/blog-generation/run', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Blog generation started! Workflow ID: ${data.workflowId}`);
        setWorkflowStatus({
          workflowId: data.workflowId,
          status: 'running',
        });
        // Start polling for status
        setTimeout(() => checkWorkflowStatus(data.workflowId), 2000);
      } else {
        setMessage(`Error: ${data.error || 'Failed to start workflow'}`);
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkWorkflowStatus = async (workflowId: string) => {
    try {
      const response = await fetch(`/api/blog-generation/status/${workflowId}`);
      const data = await response.json();

      if (data.workflow) {
        setWorkflowStatus(data.workflow);

        if (data.workflow.status === 'completed') {
          setMessage('Blog generation completed successfully!');
          // Refresh the blog list
          fetchRecentBlogs();
        } else if (data.workflow.status === 'failed') {
          setMessage(`Blog generation failed: ${data.workflow.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error checking workflow status:', error);
    }
  };

  const updateBlogStatus = async (blogId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/blogs/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId, status: newStatus }),
      });

      if (response.ok) {
        setMessage(`Blog status updated to ${newStatus}`);
        fetchRecentBlogs();
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'running':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '⚪';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '32px',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            🚀 Blog Generation Admin
          </h1>
          <p style={{ margin: 0, color: '#718096', fontSize: '16px' }}>
            Generate AI-powered blog posts with one click
          </p>
        </div>

        {/* Trigger Section */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ marginTop: 0, color: '#2d3748', fontSize: '24px' }}>
            Generate New Blog
          </h2>

          <button
            onClick={triggerBlogGeneration}
            disabled={loading || workflowStatus?.status === 'running'}
            style={{
              background: loading || workflowStatus?.status === 'running'
                ? '#a0aec0'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading || workflowStatus?.status === 'running' ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              marginBottom: '20px',
            }}
            onMouseOver={(e) => {
              if (!loading && workflowStatus?.status !== 'running') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            {loading || workflowStatus?.status === 'running'
              ? '⏳ Generating...'
              : '✨ Generate Blog Post'}
          </button>

          {/* Status Message */}
          {message && (
            <div style={{
              padding: '16px',
              background: workflowStatus?.status === 'failed' ? '#fed7d7' : '#c6f6d5',
              color: workflowStatus?.status === 'failed' ? '#9b2c2c' : '#22543d',
              borderRadius: '8px',
              marginBottom: '20px',
            }}>
              {message}
            </div>
          )}

          {/* Workflow Progress */}
          {workflowStatus && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              background: '#f7fafc',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
            }}>
              <h3 style={{ marginTop: 0, color: '#2d3748', fontSize: '18px' }}>
                Workflow Progress
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <strong>Status:</strong>{' '}
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '4px',
                  background: workflowStatus.status === 'running' ? '#faf089' :
                              workflowStatus.status === 'completed' ? '#9ae6b4' : '#fc8181',
                  color: '#2d3748',
                  fontWeight: 'bold',
                }}>
                  {workflowStatus.status.toUpperCase()}
                </span>
              </div>

              {workflowStatus.currentStep && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>Current Step:</strong> {workflowStatus.currentStep}
                </div>
              )}

              {workflowStatus.steps && workflowStatus.steps.length > 0 && (
                <div>
                  <strong>Steps:</strong>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                    {workflowStatus.steps.map((step, index) => (
                      <li key={index} style={{
                        padding: '8px 0',
                        borderBottom: '1px solid #e2e8f0',
                      }}>
                        {getStepIcon(step.status)} {step.name}
                        {step.duration && (
                          <span style={{ color: '#718096', marginLeft: '10px' }}>
                            ({(step.duration / 1000).toFixed(2)}s)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workflowStatus.result && (
                <div style={{ marginTop: '15px' }}>
                  <strong>Result:</strong>
                  <pre style={{
                    background: 'white',
                    padding: '10px',
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '12px',
                  }}>
                    {JSON.stringify(workflowStatus.result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Blogs */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#2d3748', fontSize: '24px' }}>
              Recent Blog Posts
            </h2>
            <button
              onClick={fetchRecentBlogs}
              disabled={loadingBlogs}
              style={{
                background: '#edf2f7',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: loadingBlogs ? 'not-allowed' : 'pointer',
                color: '#2d3748',
                fontWeight: 'bold',
              }}
            >
              {loadingBlogs ? '⏳ Loading...' : '🔄 Refresh'}
            </button>
          </div>

          {recentBlogs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#718096'
            }}>
              <p style={{ fontSize: '18px', margin: 0 }}>
                No blogs yet. Generate your first one! 🚀
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ background: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#2d3748' }}>Title</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#2d3748' }}>Keyword</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#2d3748' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#2d3748' }}>Created</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#2d3748' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBlogs.map((blog) => (
                    <tr key={blog.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>
                        <a
                          href={`/blog-details-light?slug=${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#667eea',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                          }}
                        >
                          {blog.title}
                        </a>
                      </td>
                      <td style={{ padding: '12px', color: '#718096' }}>
                        {blog.primary_keyword || 'N/A'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          background: blog.status === 'published' ? '#9ae6b4' : '#faf089',
                          color: '#2d3748',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}>
                          {blog.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#718096', fontSize: '14px' }}>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        {blog.status === 'draft' ? (
                          <button
                            onClick={() => updateBlogStatus(blog.id, 'published')}
                            style={{
                              background: '#48bb78',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '6px 12px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => updateBlogStatus(blog.id, 'draft')}
                            style={{
                              background: '#ed8936',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '6px 12px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          >
                            Unpublish
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '16px',
          padding: '20px',
          marginTop: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ marginTop: 0, color: '#2d3748', fontSize: '18px' }}>
            ℹ️ How It Works
          </h3>
          <ul style={{ color: '#4a5568', lineHeight: '1.8' }}>
            <li>Click "Generate Blog Post" to start the AI workflow</li>
            <li>The system will research trending topics and write a 1500-2000 word blog</li>
            <li>Generation takes 2-4 minutes to complete</li>
            <li>New blogs are created as "draft" - click "Publish" to make them live</li>
            <li>Each blog costs approximately $0.20 in API credits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
