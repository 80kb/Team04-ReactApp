const Reports = () => (
	<div className='reports'>
	<h1>Generate Reports</h1>
	<form action="/">
		<p>Report type:</p><br/>
		<input type="radio"/><br/>
		<input type="radio"/><br/>
		<input type="radio"/><br/>
		<p>User(s) (comma separated):</p><br/>
		<input type="text" id="lname" name="lname" value="John Doe"/><br/><br/>
		<input type="submit" value="Submit"/>
	</form>
	</div>
);

export default Reports;
