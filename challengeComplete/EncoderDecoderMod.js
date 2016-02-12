String.prototype.encode = function() {
	var reference = "abcdefghijklmnopqrstuvwxyz !'.?;,";
	var encoding = ",;?.'! zyxwvutsrqponmlkjihgfedcba";
	var input = this.valueOf().toLowerCase();
	var output = "";
	var n, p;
	
	for (n=0; n<input.length; n++) {
		// find location of character in reference string
		p = reference.indexOf(input.charAt(n));
		// grab character at that location in encoded string
		output += encoding.charAt(p);
	}
	
	return output;
};

String.prototype.decode = function() {
	var reference = "abcdefghijklmnopqrstuvwxyz !'.?;,";
	var encoding = ",;?.'! zyxwvutsrqponmlkjihgfedcba";
	var input = this.valueOf().toLowerCase();
	var output = "";
	var n, p;
	
	for (n=0; n<input.length; n++) {
		// find location of character in reference string
		p = encoding.indexOf(input.charAt(n));
		// grab character at that location in encoded string
		output += reference.charAt(p);
	}			
	
	return output;
};