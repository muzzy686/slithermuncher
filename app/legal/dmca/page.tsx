export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">DMCA Takedown Notice</h1>
        
        <div className="prose prose-invert">
          <h2>Copyright Infringement Notice</h2>
          <p>
            slithermuncher.xyz respects the intellectual property rights of others and expects our users to do the same.
          </p>
          
          <h2>Filing a DMCA Takedown Notice</h2>
          <p>
            If you believe that content on our website infringes your copyright, please send a written notice to our designated agent:
          </p>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <p><strong>Email:</strong> admin@slithermuncher.xyz</p>
            <p><strong>Subject:</strong> DMCA Takedown Request</p>
          </div>
          
          <h2>Required Information</h2>
          <p>Your notice must include:</p>
          <ul>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the material claimed to be infringing</li>
            <li>Your contact information (name, address, phone, email)</li>
            <li>A statement of good faith belief that use is not authorized</li>
            <li>A statement of accuracy and authority to act on behalf of the copyright owner</li>
            <li>Your physical or electronic signature</li>
          </ul>
          
          <h2>Response Time</h2>
          <p>
            We will respond to valid DMCA notices within 48 hours and take appropriate action, 
            which may include removing or disabling access to the allegedly infringing material.
          </p>
        </div>
      </div>
    </div>
  );
}