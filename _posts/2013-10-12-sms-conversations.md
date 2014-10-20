---
layout : post
title : 读取短信分组
category : blog
tags : [Android, 短信]
---

源码的`android.provider.Telephony`类包含了有关短信操作的内容。
这个类中有一个内部类`Conversations`, 它包含了一些短信分组的信息:
{% highlight java %}
public static final class Conversations
        implements BaseColumns, TextBasedSmsColumns {
    /**
     * The content:// style URL for this table
     */
    public static final Uri CONTENT_URI =
        Uri.parse("content://sms/conversations");

    /**
     * The default sort order for this table
     */
    public static final String DEFAULT_SORT_ORDER = "date DESC";

    /**
     * The first 45 characters of the body of the message
     * <P>Type: TEXT</P>
     */
    public static final String SNIPPET = "snippet";

    /**
     * The number of messages in the conversation
     * <P>Type: INTEGER</P>
     */
    public static final String MESSAGE_COUNT = "msg_count";
}
{% endhighlight %}
通过这个类，我们知道短信分组的uri是"content://sms/conversations".

通过"content://sms/conversations"查询的时候, 返回的数据包括3个字段, 分别是:`thread_id`,`msg_count`和`snippet`. 
`thread_id`每组短信都有一个唯一ID,通过这个ID可以查找电话号码的其他信息; `msg_count`是这组短信的数量;`snippet`是短信摘要;



一个Demo
{% highlight java %}
Uri uri = Uri.parse("content://sms/conversations");
Cursor cursor = getContentResolver().query(uri, null, null, null, "date DESC");

if (cursor != null) {
	Log.v(TAG, "count = " + cursor.getCount());
	
	Log.v(TAG, "column count " + cursor.getColumnCount());
	
	while (cursor.moveToNext()) {
		int threadId = cursor.getInt(cursor.getColumnIndex("thread_id"));
		int msgCount = cursor.getInt(cursor.getColumnIndex("msg_count"));
		String body = cursor.getString(cursor.getColumnIndex("snippet"));
		String address = null;
		Cursor c = getContentResolver().query(Uri.parse("content://sms/inbox"), null, "thread_id=?", new String[]{threadId+""}, null);
		if (c != null) {
			c.moveToNext();
			address = c.getString(c.getColumnIndex("address"));
			c.close();
		}
		Log.v(TAG, String.format("address : %s, msg_count: %d, body : %s", address, msgCount, body));
		
	}
	
	cursor.close();
}
{% endhighlight %}
