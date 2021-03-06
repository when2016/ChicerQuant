/**
 * 
 */
package AnyQuantProject.data.jsonDATA;

import java.util.Calendar;

import AnyQuantProject.util.exception.NetFailedException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import AnyQuantProject.data.util.DataType;
import AnyQuantProject.data.util.JsonHelper;
import AnyQuantProject.dataService.jsonDATAService.JSONBenchMarkDATAService;


/**
 * @author G
 *
 */
public class JSONBenchMarkDATA implements JSONBenchMarkDATAService{

	JsonHelper jHelper = new JsonHelper();

	@Override
	public JSONArray getAllBenchMark() throws NetFailedException {
		String key = "benchmark/all";
		return jHelper.getAll(key);
	}

	
	@Override
	public JSONObject getOperation(String name, Calendar date) throws NetFailedException{
		return jHelper.getOperation(DataType.BENCHMARK, name, date);
	}

	
	@Override
	public JSONArray getBenchMarkAmongDate(String name, Calendar start,
			Calendar end) throws NetFailedException{
		return jHelper.getAmongDate(DataType.BENCHMARK, name, start, end);
	}


	public static void main(String[] args) {
		JSONBenchMarkDATA j = new JSONBenchMarkDATA();
//		j.getAllBenchMark();
//		j.getOperation("hs300", Calendar.getInstance());
//		j.getBenchMarkAmongDate("hs300", CalendarHelper.getPreviousDay(Calendar.getInstance()), Calendar.getInstance());
	}


	/* (non-Javadoc)
	 * @see AnyQuantProject.dataService.jsonDATAService.JSONBenchMarkDATAService#getAllBenchMarkWithChinese()
	 */
	@Override
	public JSONArray getAllBenchMarkWithChinese() throws NetFailedException{
		String key = "benchmark/all";
		return jHelper.getAllWithChinese(key);
	}
}
