from bottle import run, route, static_file

if __name__ == "__main__":

	@route('/Outlast/<filepath>')
	def serve_static(filepath):
		return static_file(filepath,root="./main")

	@route('/<filepath:path>')
	def serveResources(filepath):
		return static_file(filepath,root="./main")

	run(host="localhost",port="9090",debug=True)