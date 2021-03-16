const { spawn } = require( 'child_process' );
const ls = spawn( './jsreport', [ 'start' ] );

ls.stdout.on( 'data', ( data ) => {
    console.log(data);
} );

ls.stderr.on( 'data', ( data ) => {
    console.log(data);
} );

ls.on( 'close', ( code ) => {
    console.log( `child process exited with code ${ code }` );
} );