---
layout: post
title: 创建CheckedTextView
category: blog
---

自定义创建CheckedTextView, 实现checkable, 并增加 OnCheckedChangeListener (这个源代码的CheckedTextView可以是没有的).

首先是实现 Checkable, 这个比较简单.
{% highlight java %}
public class CheckedTextView extends TextView implements Checkable {

    private boolean mIsChecked;

    public CheckedTextView(Context context) {
        this(context, null);
    }

    public CheckedTextView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public CheckedTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    @Override
    public void setChecked(boolean checked) {
        mIsChecked = checked;
    }

    @Override
    public boolean isChecked() {
        return mIsChecked;
    }

    @Override
    public void toggle() {
        setChecked(!mIsChecked);
    }
}
{% endhighlight %}

创建 OnCheckedChangeListener 接口
{% highlight java %}
public static interface OnCheckedChangeListener {
    public void onCheckedChanged(CheckedTextView view, boolean checked);
}
{% endhighlight %}
实现 OnCheckedChangeListener 接口
{% highlight java %}
private OnCheckedChangeListener mOnCheckedChangeListener;

@Override
public void setChecked(boolean checked) {
    if (mIsChecked != checked) {
        mIsChecked = checked;
        if (mOnCheckedChangeListener != null) {
            mOnCheckedChangeListener.onCheckedChanged(this, checked);
        }
    }
}

public void setOnCheckedChangeListener (OnCheckedChangeListener listener) {
    mOnCheckedChangeListener = listener;
}
{% endhighlight %}

接下来实现自动刷新背景图片, 也就是当TextView的isChecked()返回true的时候, 背景图片能够自动更换为选中的图层, 
当然前提是你已经定义了. 


首先创建Checked状态数组:
{% highlight java%}
private static final int[] CHECKED_STATE_SET = {
        android.R.attr.state_checked
};
{% endhighlight %}

覆盖父类`onCreateDrawableState`方法:
{% highlight java %}
@Override
protected int[] onCreateDrawableState(int extraSpace) {
    final int[] drawableState = super.onCreateDrawableState(extraSpace + 1);
    if (isChecked()) {
        mergeDrawableStates(drawableState, CHECKED_STATE_SET);
    }
    return drawableState;
}
{% endhighlight %}
最后修改`setChecked`方法, 添加`refreshDrawableState()`方法:
{% highlight java %}
@Override
public void setChecked(boolean checked) {
    if (mIsChecked != checked) {
        mIsChecked = checked;
        refreshDrawableState();
        if (mOnCheckedChangeListener != null) {
            mOnCheckedChangeListener.onCheckedChanged(this, checked);
        }
    }
}
{% endhighlight %}

至此一个自定义的CheckedTextView就完成了. 

通常`refreshDrawableState`要和`getDrawableState`一起使用. 使用`refreshDrawableState`会强制刷新drawable的状态, 同时会调用`drawableStateChanged`. 对于一个新的状态, 将调用`getDrawableState`.
我们这里的`state_checked`就是一个新的状态.


